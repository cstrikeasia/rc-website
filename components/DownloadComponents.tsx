import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DownloadComponentsProps {
  downloadUrl: string;
  label: string;
  isMobile: boolean;
  content: { [key: string]: string };
  icon: any;
}

const DownloadComponents: React.FC<DownloadComponentsProps> = ({
  downloadUrl,
  label,
  isMobile,
  content,
  icon,
}) => {
  if (!label || !content) {
    return null;
  }

  return (
    <p className={content["downloadPC"]}>
      <a
        href={!isMobile ? downloadUrl : undefined}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => {
          if (isMobile) {
            e.preventDefault();
          }
        }}
        aria-disabled={isMobile}
        style={
          isMobile
            ? { pointerEvents: "none", opacity: 0.6, cursor: "not-allowed" }
            : {}
        }
      >
        <FontAwesomeIcon size="3x" icon={icon} style={{ marginRight: "5px", verticalAlign: "middle" }} />
        <strong>{label}</strong>
      </a>
    </p>
  );
};

export default DownloadComponents;
