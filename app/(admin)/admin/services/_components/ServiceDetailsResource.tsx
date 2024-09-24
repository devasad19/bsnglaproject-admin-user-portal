import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";


const ServiceDetailsResource = () => {

    const router = useRouter();
  const [status, setStatus] = useState("");
  const [serviceImg, setServiceImg] = useState<File | null>(null);
  const [tutorialVideo, setTutorialVideo] = useState(null);
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showItem, setShowItem] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

    const onSubmitServiceDetailsResource = async (data:any) => {
        console.log(data);
    }

    return (
        <>
        <form onSubmit={handleSubmit(onSubmitServiceDetailsResource)}>
          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  className="after:content-['_*'] after:text-red-500"
                >
                  Description For Details Page
                </label>
              </legend>

              <textarea
                {...register("description", {
                  required: "description is required",
                  validate: {
                    maxWords: (value) => {
                      const wordCount = value
                        .trim()
                        .split(/\s+/).length;
                      return (
                        wordCount <= 80 ||
                        "Description cannot exceed 80 words"
                      );
                    },
                  },
                })}
                id=""
                className="outline-none p-2"
                placeholder="Description"
              ></textarea>
            </fieldset>
            {errors.description && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.description.message as string}
              </p>
            )}
          </div>

          {/* <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  className="after:content-['_*'] after:text-red-500"
                >
                  Type
                </label>
              </legend>

              <select
                {...register("type", {
                  required: "Type is required",
                })}
                className="outline-none p-2 bg-white"
              >
                <option value="Application">Application</option>
                <option value="Plugin">Plugin</option>
                <option value="Mobile Apps">Mobile Apps</option>
                <option value="Datasets">Data Sets</option>
                <option value="Tools">Tools</option>
                <option value="Papers">Papers</option>
                <option value="Font">Font</option>
              </select>
            </fieldset>
            {errors.type && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.type.message}
              </p>
            )}
          </div> */}

          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  className="after:content-['_*'] after:text-red-500"
                >
                  Modules (file)
                </label>
              </legend>

              <input
                {...register("logo", {
                  required: "Logo is required",
                })}
                id="file"
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setServiceImg(e.target.files[0]);
                  }
                }}
                // accept="video/mp4, video/ogg, video/avi"
                accept="image/*"
              />
            </fieldset>
            {errors.logo && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.logo.message as string}
              </p>
            )}
          </div>
          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  className="after:content-['_*'] after:text-red-500"
                >
                  Media Images
                </label>
              </legend>

              <input
                {...register("media_image", {
                  required: "Logo is required",
                })} 
                id="file"
                type="file"
                onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setServiceImg(e.target.files[0]);
                    }
                  }}
                // accept="video/mp4, video/ogg, video/avi"
                accept="image/*"
              />
            </fieldset>
            {errors.media_image && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.media_image.message as string}
              </p>
            )}
          </div>

          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  className="after:content-['_*'] after:text-red-500"
                >
                  Support Address
                </label>
              </legend>
              <input
                {...register("support_address", {
                  required: "Support Address is required",
                  
                })} 
                type="text"
                placeholder="Support Address"
                className="outline-none p-2"
              />
            </fieldset>
            {errors.support_address && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.support_address.message as string}
              </p>
            )}
          </div>

          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  className="after:content-['_*'] after:text-red-500"
                >
                  API Documentation
                </label>
              </legend>

              <textarea
                {...register("api_doc", {
                  required: "Api Document is required",
                  validate: {
                    maxWords: (value) => {
                      const wordCount = value
                        .trim()
                        .split(/\s+/).length;
                      return (
                        wordCount <= 80 ||
                        "Api Documents cannot exceed 80 words"
                      );
                    },
                  },
                })}
                id=""
                className="outline-none p-2"
                placeholder="API documentation"
              ></textarea>
            </fieldset>
            {errors.api_doc && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.api_doc.message as string}
              </p>
            )}
          </div>
          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  className="after:content-['_*'] after:text-red-500"
                >
                  User Documentation
                </label>
              </legend>

              <textarea
                {...register("user_doc", {
                  required: "User Documents is required",
                  validate: {
                    maxWords: (value) => {
                      const wordCount = value
                        .trim()
                        .split(/\s+/).length;
                      return (
                        wordCount <= 80 ||
                        "User Documents cannot exceed 80 words"
                      );
                    },
                  },
                })}
                id=""
                className="outline-none p-2"
                placeholder="User documentation"
              ></textarea>
            </fieldset>
            {errors.user_doc && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.user_doc.message as string}
              </p>
            )}
          </div>

          {/* <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  className="after:content-['_*'] after:text-red-500"
                >
                  Production Status
                </label>
              </legend>

              <select
                {...register("production_status", {
                  required: "Production Status is required",
                })}
                className="outline-none p-2 bg-white"
              >
                <option value="Live">Live</option>
                <option value="Beta">Beta</option>
                <option value="On Test">On Test</option>
              </select>
            </fieldset>
            {errors.production_status && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.production_status.message}
              </p>
            )}
          </div>

          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  className="after:content-['_*'] after:text-red-500"
                >
                  Distribution
                </label>
              </legend>

              <select
                {...register("distribution", {
                  required: "Distribution is required",
                })}
                className="outline-none p-2 bg-white"
              >
                <option value="web">Web</option>
                <option value="windows">Windows</option>
                <option value="linux">Linux</option>
                <option value="mac">Mac</option>
                <option value="ios">IOS</option>
                <option value="android">Android</option>
              </select>
            </fieldset>
            {errors.distribution && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.distribution.message}
              </p>
            )}
          </div>

          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  className="after:content-['_*'] after:text-red-500"
                >
                  Release Date
                </label>
              </legend>

              <input
                type="date"
                {...register("release_date", {
                  required: "Release Date is required",
                })}
                className="outline-none p-2 bg-white"
              />
            </fieldset>
            {errors.release_date && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.release_date.message}
              </p>
            )}
          </div> */}

          {/* {serviceImg && (
            <Image
              src={URL.createObjectURL(serviceImg)}
              width={320}
              height={192}
              className="w-80 h-48 rounded-md"
              alt="Preview"
            />
          )}
          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  className="after:content-['_*'] after:text-red-500"
                >
                  Logo
                </label>
              </legend>

              <input
                {...register("logo", {
                  required: "Logo is required",
                })}
                id="file"
                type="file"
                onChange={(e) => {
                  setServiceImg(e.target.files[0]);
                }}
                // accept="video/mp4, video/ogg, video/avi"
                accept="image/*"
              />
            </fieldset>
            {errors.logo && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.logo.message}
              </p>
            )}
          </div>

          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  className="after:content-['_*'] after:text-red-500"
                >
                  Paid Status
                </label>
              </legend>
              <div className="flex gap-2 p-2">
                <div className="space-x-2">
                  <input
                    type="checkbox"
                    name="free"
                    {...register("free")}
                    id=""
                    className="w-4 h-4"
                    value={"Free"}
                  />
                  <label htmlFor="free">Free</label>
                </div>
                <div className="space-x-2">
                  <input
                    type="checkbox"
                    {...register("pro")}
                    id=""
                    className="w-4 h-4"
                    value={"Pro"}
                  />
                  <label htmlFor="pro">Pro</label>
                </div>
              </div>
            </fieldset>
            {errors.paid_status && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.paid_status.message}
              </p>
            )}
          </div>

          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  className="after:content-['_*'] after:text-red-500"
                >
                  user access
                </label>
              </legend>

              <select
                {...register("visit_type", {
                  required: "Button is required",
                })}
                onChange={(e) => setShowItem(e.target.value)}
                id=""
                className="outline-none p-2 bg-white"
              >
                <option value="Download">Download</option>
                <option value="Visit">Visit</option>
                <option value="Subscribe">Subscribe</option>
              </select>
            </fieldset>
            {errors.visit_type && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.visit_type.message}
              </p>
            )}
          </div>
          {showItem == "Visit" || showItem == "Subscribe" ? (
            <div>
              <fieldset className="flex flex-col border rounded-md px-2">
                <legend>
                  <label
                    htmlFor="ServiceName"
                    className="after:content-['_*'] after:text-red-500"
                  >
                    {showItem} Link
                  </label>
                </legend>

                <input
                  type="text"
                  {...register("visit_link", {
                    required: "Visit Link is required",
                  })}
                  className="w-full outline-none p-2"
                  placeholder="Enter Link"
                />
              </fieldset>
              {errors.visit_link && (
                <p className="text-red-500 text-12 px-2 pt-1">
                  {errors.visit_link.message}
                </p>
              )}
            </div>
          ) : (
            <div>
              <fieldset className="flex flex-col border rounded-md px-2">
                <legend>
                  <label
                    htmlFor="ServiceName"
                    className="after:content-['_*'] after:text-red-500"
                  >
                    Resource Download
                  </label>
                </legend>

                <input
                  {...register("resource_file", {
                    required: "resource_file is required",
                  })}
                  id="file"
                  type="file"
                  onChange={(e) => {
                    setServiceImg(e.target.files[0]);
                  }}
                  // accept="video/mp4, video/ogg, video/avi"
                  accept="image/*"
                />
              </fieldset>
              {errors.resource_file && (
                <p className="text-red-500 text-12 px-2 pt-1">
                  {errors.resource_file.message}
                </p>
              )}
            </div>
          )} */}
          <div className="flex justify-between pt-5">
            <p className="text-14">
              <span className="text-red-500">*</span> Required
            </p>
            {isLoading ? (
              <button
                type="button"
                className="px-4 py-2 bg-violet-700 text-white active:scale-90 transition-all duration-400 rounded-md"
              >
                Loading...
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-violet-700 text-white active:scale-90 transition-all duration-400 rounded-md"
              >
                Create
              </button>
            )}
          </div>
        </form>
      </>
    );
};

export default ServiceDetailsResource;