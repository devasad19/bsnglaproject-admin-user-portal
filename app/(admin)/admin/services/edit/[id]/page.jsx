export const revalidate = 3600;


import ServiceEditContainer from '../../../../component/ServiceEditContainer/ServiceEditContainer';
import { getSingleServiceDetailsResource, updateSingleServiceResource } from "@/app/(admin)/_api";
const Home = async ({ params: { id } }) => {

  const response2 = await getSingleServiceDetailsResource(id).catch((err) => console.log(err));

  const secondTab = {
    description: response2?.data?.details?.broad_description,
    mediaImages: JSON.parse(response2?.data?.details?.media_images) ?? [],
    distribution: JSON.parse(response2?.data?.details?.distribution_items) ?? [
      {
        label: "",
        icon: "",
      }
    ],
    domain_name: response2?.data?.details?.domain_name ?? '',
    domain_link: response2?.data?.details?.domain_link ?? '',
    user_doc: {
      label: response2?.data?.details?.user_doc_label ?? '',
      icon: response2?.data?.details?.user_doc_icon ?? '',
      short_description: response2?.data?.details?.user_desc ?? '',
      external_links: JSON.parse(response2?.data?.details?.user_external_links) ?? [
        {
          label: "",
          link: ""
        }
      ],
      video: {
        link: response2?.data?.details?.user_youtube_link ?? '',
        thumbnail: response2?.data?.details?.user_youtube_thumbnail ?? '',
        title: response2?.data?.details?.youtube_video_title ?? ''
      },
      module_file: JSON.parse(response2?.data?.details?.user_modules) ?? [
        {
          label: "",
          version: "",
          module: ""
        }
      ]
    },
    promotion: {
      title: response2?.data?.details?.promotion_title ?? '',
      title_bg: response2?.data?.details?.prom_title_bg ?? '',
      left_side: {
        label: response2?.data?.details?.prom_left_label ?? '',
        image: response2?.data?.details?.prom_left_icon ?? '',
      },
      right_side: {
        label: response2?.data?.details?.prom_right_label ?? '',
        image: response2?.data?.details?.prom_right_icon ?? '',
      },
      area_bg: response2?.data?.details?.prom_area_bg ?? '',
    },
    infoSection: response2?.data?.details?.featurs_and_usages ? JSON.parse(response2?.data?.details?.featurs_and_usages) : [
      {
        bg_color: '',
        left_description: '',
        right_description: '',
        right_img: '',
      }
    ],
    fourCol: JSON.parse(response2?.data?.details?.distribution_card_items) ?? [
      {
        item_bg: '',
        icon: '',
        title: '',
        version: '',
        release_date: '',
        btn_label: '',
        btn_bg: '',
        brows_type: '',
        brows_file: '',
        brows_link: '',
      }
    ],

  }

  return (
    <ServiceEditContainer id={id} secondTab={secondTab} />
  );
};
export default Home;