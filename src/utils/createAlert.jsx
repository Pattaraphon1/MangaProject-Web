import Swal from "sweetalert2";

export const createAlert = (icon,text)=>{
  return Swal.fire({
    title: text || "Something Wrong",
    icon: icon || "info",
    timer:2000,
  });
};