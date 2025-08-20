import React from "react";

export default function Category() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Danh mục sản phẩm</h2>
      <div className="text-right">
        <button className="bg-blue-500 px-4 py-2 text-white rounded">
          Thêm danh mục
        </button>
      </div>

      <table></table>
    </div>
  );
}
