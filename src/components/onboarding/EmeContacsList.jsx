/* eslint-disable react/prop-types */
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
      <h3>Emergency contact</h3>
      {contacts.map((contact, idx) => {
        return (
          <EmeContactForm
            i={idx}
            key={idx}
            contact={contact}
            onChange={onContentChange}
            onRemoveContact={onRemoveContact}
          />
        );
      })}
      <button type="button" onClick={onAddContact}>
        Add Contact
      </button>
    </div>
  );
};

export default EmeContactsDiv;
