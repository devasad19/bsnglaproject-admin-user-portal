import { getSingleServiceDetailsResource } from "@/app/(admin)/_api/ServiceApi";
import { getSettingActiveColors } from "@/app/(admin)/_api/Setting/ColorApi";
import { getActiveSettingIcon } from "@/app/(admin)/_api/Setting/SettingIconApi";
import dynamic from "next/dynamic";
const ServiceEditContainer = dynamic(
  () =>
    import("../../../../component/ServiceEditContainer/ServiceEditContainer"),
  { ssr: false }
);
const Home = async ({ params: { id } }) => {
  const response2 = await getSingleServiceDetailsResource(id).catch((err) =>
    console.log(err)
  );

  const response = await getSettingActiveColors()
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
  const responseIcon = await getActiveSettingIcon()
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });

  // console.log('service response: ',response2?.date);

  const secondTab = {
    description: response2?.data?.details?.broad_description ?? "",
    mediaImages: response2?.data?.details?.media_images
      ? JSON.parse(response2?.data?.details?.media_images)
      : [],
    distribution: response2?.data?.details?.distribution_items
      ? JSON.parse(response2?.data?.details?.distribution_items)
      : [
          {
            label: "",
            icon: "",
          },
        ],
    domain_name: response2?.data?.details?.domain_name ?? "",
    domain_link: response2?.data?.details?.domain_link ?? "",
    user_doc: {
      label: response2?.data?.details?.user_doc_label ?? "",
      icon: response2?.data?.details?.user_doc_icon ?? "",
      short_description: response2?.data?.details?.user_desc ?? "",
      external_links: response2?.data?.details?.user_external_links
        ? JSON.parse(response2?.data?.details?.user_external_links)
        : [
            {
              label: "",
              link: "",
            },
          ],
      video: {
        link: response2?.data?.details?.user_youtube_link ?? "",
        thumbnail: response2?.data?.details?.user_youtube_thumbnail ?? "",
        title: response2?.data?.details?.youtube_video_title ?? "",
      },
      module_file: response2?.data?.details?.user_modules
        ? JSON.parse(response2?.data?.details?.user_modules)
        : [
            {
              label: "",
              module: "",
              download: 0,
            },
          ],
    },
    promotion: {
      title: response2?.data?.details?.promotion_title ?? "",
      title_bg: response2?.data?.details?.prom_title_bg ?? "",
      left_side: {
        label: response2?.data?.details?.prom_left_label ?? "",
        image: response2?.data?.details?.prom_left_icon ?? "",
      },
      right_side: {
        label: response2?.data?.details?.prom_right_label ?? "",
        image: response2?.data?.details?.prom_right_icon ?? "",
      },
      area_bg: response2?.data?.details?.prom_area_bg ?? "",
    },
    infoSection: response2?.data?.details?.featurs_and_usages
      ? JSON.parse(response2?.data?.details?.featurs_and_usages)
      : [
          {
            bg_color: "",
            left_description: "",
            right_description: "",
            right_img: "",
          },
        ],
    fourCol: response2?.data?.details?.distribution_card_items
      ? JSON.parse(response2?.data?.details?.distribution_card_items)
      : [
          {
            item_bg: "",
            icon: "",
            title: "",
            version: "",
            release_date: "",
            btn_label: "",
            btn_bg: "",
            brows_type: "",
            brows_file: "",
            brows_link: "",
          },
        ],
  };

  return (
    <ServiceEditContainer
      id={id}
      secondTab={secondTab}
      allColors={response?.data}
      allIcons={responseIcon?.data}
    />
  );
};
export default Home;
