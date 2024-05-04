/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import EmeContactForm from "./EmeContactForm";

const EmeContactsDiv = ({
  contacts,
  onFieldChange,
  onAddContact,
  onRemoveContact,
}) => {
  const onContentChange = (field, fieldValue, index) => {
    onFieldChange(field, fieldValue, index);
  };

  return (
    <div className="emergency_contact_div">
      <h3>
        Emergency contact
        <Button
          style={{ marginLeft: "10px" }}
          size="small"
          variant="contained"
          type="button"
          onClick={onAddContact}
        >
          Add Contact
        </Button>
      </h3>
      {contacts.map((contact, idx) => {
        return (
          <div key={idx}>
            <p>Contact {idx + 1}</p>
            <EmeContactForm
              i={idx}
              contact={contact}
              onChange={onContentChange}
              onRemoveContact={onRemoveContact}
            />
          </div>
        );
      })}
    </div>
  );
};

export default EmeContactsDiv;
