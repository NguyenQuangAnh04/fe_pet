import { FiSearch } from "react-icons/fi";
import { formatPrice } from "../../../utils/format";
import { useQueryExamination } from "../../../hook/examination/useExamination";
import { useEffect, useState } from "react";
import { userAddExaminationSpecial } from "../../../hook/examination/useAddExaminationSp";
import { toast } from "react-toastify";

export type ExtraService = {
  id: number;
  name: string;
  description?: string;
  price?: number;
  durationLabel?: string;
  category?: string;
};
export interface ModalExamSpecialProps {
  onClose: () => void;
  appointmentId: number;
  initialSelectedIds?: number[];
}

export default function ModalExamSpecial({
  onClose,
  appointmentId,
  initialSelectedIds,
}: ModalExamSpecialProps) {

  const { data } = useQueryExamination();
  const [selected, setSelected] = useState<number[]>([]);
  useEffect(() => {
    if (initialSelectedIds) {
      setSelected(initialSelectedIds);
    }
  }, [initialSelectedIds]);
  const { mutateAsync: addExaminationSpecial } = userAddExaminationSpecial();
  const toggleSelect = (id: number) => {
    setSelected((prev) => {
      const existing = prev.some((sid) => sid === id);
      if (existing) {
        return prev.filter((sid) => sid !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  const selectedPreview = data?.content.filter((svc) =>
    selected.includes(svc.id || 1)
  );
  const submitSelected = async () => {
    if (selected.length === 0) {
      toast.error("Vui lòng chọn ít nhất một dịch vụ bổ sung.");
      return;
    }
    await addExaminationSpecial({
      appointmentId: appointmentId,
      examinationSpecialIds: selected,
    });
    onClose();
  };
  const sumPrice = selectedPreview?.reduce((sum, svc) => {
    return sum + (svc.price || 0);
  }, 0);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative bg-white w-full max-w-5xl mx-4 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden">
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Chọn dịch vụ bổ sung
            </h2>
            <p className="text-sm text-gray-500">
              Tích các dịch vụ thêm để nâng cao trải nghiệm khám cho thú cưng
              của khách hàng.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl self-end md:self-auto"
            aria-label="Đóng"
            type="button"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1">
            <div className="relative mb-4">
              <FiSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
              <input
                readOnly
                value=""
                placeholder="Tìm theo tên, mô tả hoặc nhóm dịch vụ"
                className="w-full rounded-lg border border-gray-200 py-2.5 pl-12 pr-4 focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
              />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <div className="flex items-center gap-2 text-amber-600 font-medium">
                {/* <span className="inline-flex h-5 w-5 items-center justify-center rounded border border-amber-500 text-amber-500 text-xs font-semibold">
                  ✓
                </span>
                Chọn tất cả */}
              </div>
              <span>Đã chọn: {selectedPreview?.length}</span>
            </div>

            <div className="border border-gray-200 rounded-xl max-h-96 overflow-y-auto divide-y divide-gray-100">
              {data?.content
                .filter((it) => !it.active)
                .map((svc) => (
                  <label
                    key={svc.id}
                    className="flex gap-4 p-4 cursor-pointer transition-colors hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={selected.includes(svc.id || 0)}
                      onChange={() => toggleSelect(svc.id || 1)}
                      className="mt-1 h-5 w-5 text-amber-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {svc.name}
                          </p>
                        </div>
                        {typeof svc.price === "number" && (
                          <span className="text-sm font-semibold text-gray-900">
                            {formatPrice(svc.price)}
                          </span>
                        )}
                      </div>
                      {svc.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {svc.description}
                        </p>
                      )}
                    </div>
                  </label>
                ))}
            </div>
          </div>

          <aside className="lg:w-80 w-full bg-gray-50 rounded-2xl p-5 h-max border border-gray-100">
            {selectedPreview?.length ? (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Dịch vụ đã chọn
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {selectedPreview?.map((svc) => (
                    <div
                      key={`preview-${svc.id}`}
                      className="flex items-start justify-between gap-2 text-sm"
                    >
                      <div>
                        <p className="font-medium text-gray-800">{svc.name}</p>
                        {svc.description && (
                          <p className="text-xs text-gray-500">
                            {svc.description}
                          </p>
                        )}
                      </div>
                      {typeof svc.price === "number" && (
                        <p className="font-semibold text-gray-900">
                          {formatPrice(svc.price)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Số lượng dịch vụ</span>
                    <span>{selectedPreview?.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-base font-semibold text-gray-900">
                    <span>Tổng cộng</span>
                    <span>{formatPrice(sumPrice || 0)}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-500 italic text-center py-4">
                  Chưa có dịch vụ nào được chọn
                </p>
              </>
            )}
          </aside>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            Hủy bỏ
          </button>
          <button
            onClick={() => submitSelected()}
            className="px-4 py-2.5 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600"
          >
            Lưu lựa chọn
          </button>
        </div>
      </div>
    </div>
  );
}
