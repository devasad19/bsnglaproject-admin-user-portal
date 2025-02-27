export const openFileManager = (isMultiple=false) => {
  const win = window.open(
    "/admin/file-manager/view?multiple=" + isMultiple,
    "File Manager",
    "width=800,height=600,left=200,top=100"
  );

  if (win) {
    win.focus(); 
  }
};

const receiveMessage = (event:any) => {
  if (event.origin !== window.location.origin) return; // Security check
  if (event.data.type === "SELECT_IMAGE") {
    console.log("Selected Image(s):", event.data.imageIds);
  }
};

window.addEventListener("message", receiveMessage);

// Clean up listener when window closes
// const checkWindowClosed = setInterval(() => {
//   if (fileManagerWindow.closed) {
//     window.removeEventListener("message", receiveMessage);
//     clearInterval(checkWindowClosed);
//   }
// }, 1000);
// };

// // Clean up listener when window closes
// const checkWindowClosed = setInterval(() => {
//   if (win.closed) {
//     window.removeEventListener("message", receiveMessage);
//     clearInterval(checkWindowClosed);
//   }
// }, 1000);
