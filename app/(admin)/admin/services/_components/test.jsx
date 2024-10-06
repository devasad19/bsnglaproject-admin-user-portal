import { useState } from "react";

const App = () => {
  const [formData, setFormData] = useState({
    attachments: [
      {
        label: "",
        icon: null,
      },
    ],
  });

  const handleInputChange = (index, field, value) => {
    const updatedAttachments = formData.attachments.map((attachment, i) =>
      i === index ? { ...attachment, [field]: value } : attachment
    );
    setFormData({ ...formData, attachments: updatedAttachments });
  };

  const handleAddCard = () => {
    setFormData({
      ...formData,
      attachments: [...formData.attachments, { label: "", icon: null }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    formData.attachments.forEach((attachment, index) => {
      data.append(attachments[${index}][label], attachment.label);
      if (attachment.icon) {
        data.append(attachments[${index}][icon], attachment.icon);
      }
    });

    try {
      const response = await fetch("http://localhost:8000/api/test", {
        method: "POST",
        body: data,
      }).then((response) => console.log(response));
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <section className="flex 2xl:container 2xl:mx-auto">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <button type="button" onClick={handleAddCard}>
          Add new card
        </button>

        {formData.attachments.map((attachment, index) => (
          <div key={index}>
            <input
              type="text"
              value={attachment.label}
              onChange={(e) =>
                handleInputChange(index, "label", e.target.value)
              }
              placeholder="Label"
            />
            <input
              type="file"
              onChange={(e) =>
                handleInputChange(index, "icon", e.target.files[0])
              }
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};
export default App;