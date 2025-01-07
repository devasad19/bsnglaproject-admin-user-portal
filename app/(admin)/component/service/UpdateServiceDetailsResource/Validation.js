import { CountWords } from "@/helper";

const Validation = async (formData, setError) => {
  let hasError = false;

  const resetError = (field) => {
    setError((prev) => ({
      ...prev,
      [field]: { status: false, message: "" },
    }));
  };

  if (
    CountWords(formData?.description) < 10 ||
    CountWords(formData?.description) > 100
  ) {
    setError((prev) => ({
      ...prev,
      description: {
        status: true,
        message: "Description has to be 10 to 100 words.",
      },
    }));
    hasError = true;
  } else {
    resetError("description");
  }

  if (formData?.mediaImages?.length < 1 || formData?.mediaImages?.length > 5) {
    setError((prev) => ({
      ...prev,
      mediaImages: { status: true, message: "Media images has to be 1 to 5." },
    }));
    hasError = true;
  } else {
    resetError("mediaImages");
  }

  if (formData?.infoSection?.length < 1) {
    setError((prev) => ({
      ...prev,
      infoSection: {
        status: true,
        message: "Features and usages has to be at least 1.",
      },
    }));
    hasError = true;
  } else {
    resetError("infoSection");
  }

  if (formData?.promotion?.title?.length < 3) {
    setError((prev) => ({
      ...prev,
      promotion: {
        ...prev.promotion,
        title: {
          status: true,
          message: "Promotion title has to be at least 3 characters long.",
        },
      },
    }));
    hasError = true;
  } else {
    setError((prev) => ({
      ...prev,
      promotion: {
        ...prev.promotion,
        title: { status: false, message: "" },
      },
    }));
  }

  if (formData?.promotion?.title_bg?.length < 1) {
    setError((prev) => ({
      ...prev,
      promotion: {
        ...prev.promotion,
        title_bg: {
          status: true,
          message: "Select promotion title background.",
        },
      },
    }));
    hasError = true;
  } else {
    setError((prev) => ({
      ...prev,
      promotion: {
        ...prev.promotion,
        title_bg: { status: false, message: "" },
      },
    }));
  }

  if (formData?.promotion?.area_bg?.length < 1) {
    setError((prev) => ({
      ...prev,
      promotion: {
        ...prev.promotion,
        area_bg: { status: true, message: "Select promotion area background." },
      },
    }));
    hasError = true;
  } else {
    setError((prev) => ({
      ...prev,
      promotion: {
        ...prev.promotion,
        area_bg: { status: false, message: "" },
      },
    }));
  }

  if (formData?.promotion?.left_side?.label?.length < 3) {
    setError((prev) => ({
      ...prev,
      promotion: {
        ...prev.promotion,
        left_side: {
          ...prev.promotion.left_side,
          label: {
            status: true,
            message: "Left side label has to be at least 3 characters long.",
          },
        },
      },
    }));
    hasError = true;
  } else {
    setError((prev) => ({
      ...prev,
      promotion: {
        ...prev.promotion,
        left_side: {
          ...prev.promotion.left_side,
          label: { status: false, message: "" },
        },
      },
    }));
  }

  if (
    formData?.promotion?.left_side?.image &&
    formData?.promotion?.left_side?.image?.length < 1
  ) {
    setError((prev) => ({
      ...prev,
      promotion: {
        ...prev.promotion,
        left_side: {
          ...prev.promotion.left_side,
          image: { status: true, message: "Select left side image." },
        },
      },
    }));
    hasError = true;
  } else {
    setError((prev) => ({
      ...prev,
      promotion: {
        ...prev.promotion,
        left_side: {
          ...prev.promotion.left_side,
          image: { status: false, message: "" },
        },
      },
    }));
  }

  if (formData?.promotion?.right_side?.label?.length < 3) {
    setError((prev) => ({
      ...prev,
      promotion: {
        ...prev.promotion,
        right_side: {
          ...prev.promotion.right_side,
          label: {
            status: true,
            message: "Right side label has to be at least 3 characters long.",
          },
        },
      },
    }));
    hasError = true;
  } else {
    setError((prev) => ({
      ...prev,
      promotion: {
        ...prev.promotion,
        right_side: {
          ...prev.promotion.right_side,
          label: { status: false, message: "" },
        },
      },
    }));
  }

  if (
    formData?.promotion?.right_side?.image &&
    formData?.promotion?.right_side?.image?.length < 1
  ) {
    setError((prev) => ({
      ...prev,
      promotion: {
        ...prev.promotion,
        right_side: {
          ...prev.promotion.right_side,
          image: { status: true, message: "Select right side image." },
        },
      },
    }));
    hasError = true;
  } else {
    setError((prev) => ({
      ...prev,
      promotion: {
        ...prev.promotion,
        right_side: {
          ...prev.promotion.right_side,
          image: { status: false, message: "" },
        },
      },
    }));
  }

  if (formData?.fourCol?.length < 1 || formData?.fourCol?.length > 4) {
    setError((prev) => ({
      ...prev,
      fourCol: { status: true, message: "Four column has to be 1 to 4." },
    }));
    hasError = true;
  } else {
    resetError("fourCol");
  }

  if (formData?.domain_name?.length < 3) {
    setError((prev) => ({
      ...prev,
      domain_name: {
        status: true,
        message: "Domain name has to be at least 3 characters long.",
      },
    }));
    hasError = true;
  } else {
    resetError("domain_name");
  }

  if (formData?.domain_link?.length < 3) {
    setError((prev) => ({
      ...prev,
      domain_link: {
        status: true,
        message: "Domain link has to be at least 3 characters long.",
      },
    }));
    hasError = true;
  } else {
    resetError("domain_link");
  }

  if (formData?.user_doc?.label?.length < 3) {
    setError((prev) => ({
      ...prev,
      user_doc: {
        ...prev.user_doc,
        label: {
          status: true,
          message: "User document label has to be at least 3 characters long.",
        },
      },
    }));
    hasError = true;
  } else {
    setError((prev) => ({
      ...prev,
      user_doc: {
        ...prev.user_doc,
        label: { status: false, message: "" },
      },
    }));
  }

  if (formData?.user_doc?.icon && formData?.user_doc?.icon?.length < 3) {
    setError((prev) => ({
      ...prev,
      user_doc: {
        ...prev.user_doc,
        icon: { status: true, message: "Select user document icon." },
      },
    }));
    hasError = true;
  } else {
    setError((prev) => ({
      ...prev,
      user_doc: {
        ...prev.user_doc,
        icon: { status: false, message: "" },
      },
    }));
  }

  if (formData?.user_doc?.short_description?.length < 3) {
    setError((prev) => ({
      ...prev,
      user_doc: {
        ...prev.user_doc,
        shortDes: {
          status: true,
          message:
            "User document short description has to be at least 3 characters long.",
        },
      },
    }));
    hasError = true;
  } else {
    setError((prev) => ({
      ...prev,
      user_doc: {
        ...prev.user_doc,
        shortDes: { status: false, message: "" },
      },
    }));
  }

  if (formData?.user_doc?.external_links?.length < 1) {
    setError((prev) => ({
      ...prev,
      user_doc: {
        ...prev.user_doc,
        extraLink: {
          status: true,
          message: "User document external links has to be at least 1.",
        },
      },
    }));
    hasError = true;
  } else {
    setError((prev) => ({
      ...prev,
      user_doc: {
        ...prev.user_doc,
        extraLink: { status: false, message: "" },
      },
    }));
  }

  //   if (formData?.user_doc?.video?.link?.length < 3) {
  //     setError((prev) => ({
  //       ...prev,
  //       user_doc: {
  //         ...prev.user_doc,
  //         video: {
  //           status: true,
  //           message:
  //             "User document video link has to be at least 3 characters long.",
  //         },
  //       },
  //     }));
  //     hasError = true;
  //   } else {
  //     setError((prev) => ({
  //       ...prev,
  //       user_doc: {
  //         ...prev.user_doc,
  //         video: {
  //           status: false,
  //           message: "",
  //         },
  //       },
  //     }));
  //   }

  if (
    formData?.user_doc?.video?.thumbnail &&
    formData?.user_doc?.video?.thumbnail?.length < 3
  ) {
    setError((prev) => ({
      ...prev,
      user_doc: {
        ...prev.user_doc,
        video: {
          status: true,
          message: "Select user document video icon.",
        },
      },
    }));
    hasError = true;
  } else {
    setError((prev) => ({
      ...prev,
      user_doc: {
        ...prev.user_doc,
        video: {
          status: false,
          message: "",
        },
      },
    }));
  }

  //   if (formData?.user_doc?.video?.title?.length < 3) {
  //     setError((prev) => ({
  //       ...prev,
  //       user_doc: {
  //         ...prev.user_doc,
  //         video: {
  //           status: true,
  //           message:
  //             "User document video title has to be at least 3 characters long.",
  //         },
  //       },
  //     }));
  //     hasError = true;
  //   } else {
  //     setError((prev) => ({
  //       ...prev,
  //       user_doc: {
  //         ...prev.user_doc,
  //         video: {
  //           status: false,
  //           message: "",
  //         },
  //       },
  //     }));
  //   }

  if (
    formData?.distribution?.length < 1 ||
    formData?.distribution?.length > 10
  ) {
    setError((prev) => ({
      ...prev,
      distribution: {
        status: true,
        message: "Distribution has to be 1 to 10.",
      },
    }));
    hasError = true;
  } else {
    resetError("distribution");
  }

  if (formData?.user_doc?.module_file?.length < 1) {
    setError((prev) => ({
      ...prev,
      user_doc: {
        ...prev.user_doc,
        module_file: {
          status: true,
          message: "User document module file has to be at least 1.",
        },
      },
    }));
    hasError = true;
  } else {
    setError((prev) => ({
      ...prev,
      user_doc: {
        ...prev.user_doc,
        module_file: { status: false, message: "" },
      },
    }));
  }

  return hasError;
};

export default Validation;
