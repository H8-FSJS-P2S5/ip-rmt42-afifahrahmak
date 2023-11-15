import Swal from 'sweetalert2';

export const loading = () => {
    return  Swal.fire({
        title: 'Mohon tunggu',
        showConfirmButton: false,
        allowOutsideClick: false,
        willOpen: () => {
            Swal.showLoading()
        }
    });
};

export const toaster = (msg, icon) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    return  Toast.fire({
        icon: icon,
        title: `${msg} successfully`
    });
}


export const swalFire = (title, msg, icon) => {

    return  Swal.fire({
        title: title,
        text: msg,
        icon: icon,
        confirmButtonText: 'Ok'
    });
}

export const hideLoading = () => {
    return Swal.hideLoading();
}

