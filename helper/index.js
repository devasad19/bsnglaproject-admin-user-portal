import Swal from "sweetalert2";

const banglaMonthNames = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

const months = [
  "বৈশাখ",
  "জ্যৈষ্ঠ",
  "আষাঢ়",
  "শ্রাবণ",
  "ভাদ্র",
  "আশ্বিন",
  "কার্তিক",
  "অগ্রহায়ন",
  "পৌষ",
  "মাঘ",
  "ফাল্গুন",
  "চৈত্র",
];


export const CountWords = (str) => {
  str = str.trim();

  if (str.length === 0) {
    return 0;
  }

  const words = str.split(/\s+/);

  return words.length;
};

export const GetFileSize = (fileInput) => {
  return fileInput.size;
};

export const sanitizeYoutubeUrl = (url) => {
  console.log('youtube from function: ',url);
  

  const equalSignIndex = url.indexOf('=');
    
    // Check if there is an equal sign in the URL
    if (equalSignIndex === -1) {
        return ''; // No equal sign found
    }
    
    const secondEqualSignIndex = url.indexOf('=', equalSignIndex + 1);
    
    if (secondEqualSignIndex === -1) {
        // Only one equal sign found
        return url.slice(equalSignIndex + 1); // Return everything after the first equal sign
    } else {
        // Two equal signs found
        return url.slice(equalSignIndex + 1, secondEqualSignIndex); // Return substring between the two equal signs
    }
}

export function en2bn(englishNumber) {
  const englishToBanglaMap = {
    0: "০",
    1: "১",
    2: "২",
    3: "৩",
    4: "৪",
    5: "৫",
    6: "৬",
    7: "৭",
    8: "৮",
    9: "৯",
  };

  const convertedNumber = englishNumber
    .toString()
    .split("")
    .map((digit) => englishToBanglaMap[digit] || digit)
    .join("");

  return convertedNumber;
};

export const relative_image_path = (path) => {
  return "/images/" + path;
};

export function dDate($d) {
  const myDate = AddBanglaCalendar(new Date($d));
  let banglaMonth = myDate.banglaMonth; // জ্যৈষ্ঠ
  let banglaYear = myDate.banglaYear; // ১৪২৯
  let banglaDate = myDate.banglaDate; // ২৩
  let banglaCalendar = myDate.bangla; // {month:1, year:1429, date: 23};
  let dDate = `${banglaDate}, ${banglaMonth} ${banglaYear}`;
  return dDate;
};

export const dateName = ($d) => {
  const date = new Date($d);
  const options = { weekday: "long", locale: "bn-BD" };
  const dayNameInBangla = date.toLocaleDateString("bn-BD", options);
  return `${dayNameInBangla}`;
};

export const AddBanglaCalendar = (date) => {
  let monthDay = date.getMonth() * 100 + date.getDate();
  let bMonth = 0;
  let bDay = 0;
  let bYear = date.getFullYear() - 593;

  if (monthDay < 314) bYear--;

  if (monthDay >= 314 && monthDay <= 414) {
    bMonth = 0;
    bDay = monthDay < 400 ? monthDay - 313 : monthDay + 31 - 414;
  } else if (monthDay >= 415 && monthDay <= 514) {
    bMonth = 1;
    bDay = monthDay < 500 ? monthDay - 414 : monthDay + 31 - 514;
  } else if (monthDay >= 515 && monthDay <= 615) {
    bMonth = 2;
    bDay = monthDay < 600 ? monthDay - 514 : monthDay + 31 - 615;
  } else if (monthDay >= 616 && monthDay <= 715) {
    bMonth = 3;
    bDay = monthDay < 700 ? monthDay - 615 : monthDay + 31 - 715;
  } else if (monthDay >= 716 && monthDay <= 815) {
    bMonth = 4;
    bDay = monthDay < 800 ? monthDay - 715 : monthDay + 31 - 815;
  } else if (monthDay >= 816 && monthDay <= 916) {
    bMonth = 5;
    bDay = monthDay < 900 ? monthDay - 815 : monthDay + 30 - 916;
  } else if (monthDay >= 917 && monthDay <= 1015) {
    bMonth = 6;
    bDay = monthDay < 1000 ? monthDay - 916 : monthDay + 30 - 1015;
  } else if (monthDay >= 1016 && monthDay <= 1115) {
    bMonth = 7;
    bDay = monthDay < 1100 ? monthDay - 1015 : monthDay + 30 - 1115;
  } else if (monthDay >= 1116 || monthDay <= 14) {
    bMonth = 8;
    bDay = monthDay < 15 ? monthDay + 30 - 14 : monthDay - 1115;
  } else if (monthDay >= 15 && monthDay <= 113) {
    bMonth = 9;
    bDay = monthDay < 100 ? monthDay - 14 : monthDay + 30 - 113;
  } else if (monthDay >= 114 && monthDay <= 215) {
    bMonth = 10;
    if (isLeapYear(date.getFullYear()))
      bDay = monthDay < 200 ? monthDay - 113 : monthDay + 31 - 215;
    else bDay = monthDay < 200 ? monthDay - 113 : monthDay + 30 - 215;
  } else if (monthDay >= 216 && monthDay <= 313) {
    bMonth = 11;
    bDay = monthDay < 300 ? monthDay - 215 : monthDay + 30 - 313;
  }
  date.bangla = { month: bMonth, year: bYear, date: bDay };
  date.banglaMonth = months[bMonth];
  date.banglaDate = engToBanglaNumber(bDay);
  date.banglaYear = engToBanglaNumber(bYear);
  return date;
};

export const convertEnglishDateToBangla = ($d) => {
  const date = new Date($d);

  const options = { weekday: "long", locale: "bn-BD" };
  const dayNameInBangla = date.toLocaleDateString("bn-BD", options);
  const englishDay = date.getDate();
  const englishMonth = date.getMonth();
  const englishYear = date.getFullYear();

  const banglaDay = englishDay; // In most cases, the day remains the same
  const banglaMonth = banglaMonthNames[englishMonth];
  // const banglaYear = (englishYear - 593) // Assuming the English year 2023 is 1430 in Bangla year
  const banglaYear = englishYear;
  return `${en2bn(banglaDay)} ${banglaMonth}, ${en2bn(banglaYear)}`;
};

export const engToBanglaNumber = (engNum) => {
  engNum = "" + engNum;
  let bnNum = "";
  for (let i = 0; i < engNum.length; i++) {
    bnNum += String.fromCharCode(engNum.charCodeAt(i) + 2534 - 48);
  }
  return bnNum;
};

//model close
export const modelClose = (modalRef, modalForm) => {
  modalRef.current?.close();
  // console.log("helpers",modalForm.current);
  if (modalForm.current) {
    modalForm.current.reset(); // Reset the form fields
  }
};

//model open
export const modelOpen = (modalRef) => {
  if (modalRef.current) modalRef.current.showModal();
}



export const sweetAlert = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      console.log("id", id);

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/service/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            getServices()
              .then((data) => setServices(data))
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  });
}
