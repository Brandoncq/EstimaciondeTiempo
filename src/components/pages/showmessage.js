export function showmessage(content){
    Toastify({
        text: content,
        duration: 2500,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: "red",
        },
        onClick: function(){} // Callback after click
    }).showToast();
}