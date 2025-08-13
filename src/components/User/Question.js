import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";
import { useTranslation } from "react-i18next";

const Question = (props) => {
  const { t } = useTranslation();

  const { data, index } = props;

  const [isPreViewImage, setIsPreviewImage] = useState(false);

  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleHandleCheckbox = (event, aId, qId) => {
    props.handleCheckBox(aId, qId);
  };

  return (
    <>
      {data.image ? (
        <div className="q-image">
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setIsPreviewImage(true)}
            src={`data:image/jpeg;base64,${data.image}`}
          />
          {isPreViewImage === true && (
            <Lightbox
              image={`data:image/jpeg;base64,${data.image}`}
              title={"Question Image"}
              onClose={() => setIsPreviewImage(false)}
            ></Lightbox>
          )}
        </div>
      ) : (
        <div className="q-image"></div>
      )}
      <div className="question">
        {t("quiz.question")} {index + 1}: {data.questionDescription} ?
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length &&
          data.answers.map((a, index) => {
            return (
              <div key={`answer-${index}`} className="a-child">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={a.isSelected}
                    onChange={(event) =>
                      handleHandleCheckbox(event, a.id, data.questionId)
                    }
                  />
                  <label className="form-check-label">{a.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
