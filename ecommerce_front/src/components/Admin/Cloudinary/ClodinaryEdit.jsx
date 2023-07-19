export const opUploadWidget = (setProduct, product) => {
  let arrAux = JSON.parse(localStorage.getItem("cloud"));

  window.cloudinary.openUploadWidget(
    {
      cloudName: "dwqp5iaqw",
      uploadPreset: "pd8snsgx",
      sources: ["local"],
      // googleApiKey: "<image_search_google_api_key>",
      showAdvancedOptions: true,
      // cropping: true,
      multiple: true,
      defaultSource: "local",
      styles: {
        palette: {
          window: "#FFFFFF",
          windowBorder: "#90A0B3",
          tabIcon: "#0078FF",
          menuIcons: "#5A616A",
          textDark: "#000000",
          textLight: "#FFFFFF",
          link: "#0078FF",
          action: "#FF620C",
          inactiveTabIcon: "#0E2F5A",
          error: "#F44235",
          inProgress: "#0078FF",
          complete: "#20B832",
          sourceBg: "#E4EBF1",
        },
        fonts: {
          default: {
            active: true,
          },
        },
      },
    },
    (err, info) => {
      if (!err) {
        if (info.event === "queues-end") {
          arrAux.push(info.data.info.files[0].uploadInfo.secure_url);
          localStorage.setItem("cloud", JSON.stringify(arrAux));
        }
      }
    }
  );
};
