// import React, { useEffect, useState } from "react";
// import type { userDTO, userUpdateRole } from "../../types/user";
// import { userUpdateRoleUser, userAddUser } from "../../hook/user/useUser";

// type ModalUserProps = {
//     isOpen: boolean;
//     onClose: () => void;
//     mode: "create" | "update";
//     initialData?: userDTO;
// };

// const ModalUser: React.FC<ModalUserProps> = ({ isOpen, onClose }) => {
//     const [formData, setFormData] = useState<userUpdateRole>({
//         id: 0,
//         roleId: 0,
//     });

//     const { mutateAsync: mutateAddUser } = userAddUser();
//     const { mutateAsync: mutateUpdateRoleUser } = userUpdateRoleUser();


//     const handleSubmit = async () => {
//         await mutateUpdateRoleUser({
//             id: formData.id,
//             userUpdateRole: formData
//         });
//         onClose();
//     }
//     return (
//         <></>
//     );
// };



// export default ModalUser;
