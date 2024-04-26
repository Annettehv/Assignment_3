import React, { useRef, useState } from "react";
import styles from "./ExpenseForm.module.css";
function ExpenseForm() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    phoneNumberError: "",
    subjectError: "",
    messageError: "",
  });
  const textAreaElement = useRef(null);

  const validateForm = () => {
    let isValid = true;
    const clonedErrorObj = { ...errors };
    if (!userData.firstName.trim()) {
      clonedErrorObj.firstNameError = "First name is required!";
      isValid = false;
    } else if (userData.firstName.trim().length > 20) {
      clonedErrorObj.firstNameError = "Maximum character limit exceeded";
      isValid = false;
    }
    if (!userData.lastName.trim()) {
      clonedErrorObj.lastNameError = "Last name is required!";
      isValid = false;
    } else if (userData.lastName.trim().length > 20) {
      clonedErrorObj.lastNameError = "Maximum character limit exceeded";
      isValid = false;
    }
    if (!userData.email.trim()) {
      clonedErrorObj.emailError = "Email is required!";
      isValid = false;
    } else {
      const emailRegex = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(userData.email.trim())) {
        clonedErrorObj.emailError = "Invalid email format!";
        isValid = false;
      }
    }
    if (userData.phoneNumber.trim()) {
      if (userData.phoneNumber.trim().length !== 8) {
        clonedErrorObj.phoneNumberError = "Phone number must be 8 digits!";
        isValid = false;
      }
    }
    if (!userData.subject.trim()) {
      clonedErrorObj.subjectError = "Subject is required!";
      isValid = false;
    } else if (userData.subject.trim().length > 20) {
      clonedErrorObj.subjectError = "Maximum character limit exceeded";
      isValid = false;
    }

    if (!userData.message.trim()) {
      console.log(userData.message.trim());
      clonedErrorObj.messageError = "Message text is required!";
      isValid = false;
    }

    setErrors(clonedErrorObj);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [`${name}Error`]: "",
    }));
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "message" && value.length >= 300) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        messageError: "Maximum characters allowed is 300",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      // Your form submission logic here
      console.log("Form is valid. Submitting...");
    } else {
      console.log("Form is invalid. Please correct the errors.");
    }
  };

  return (
    <form className={styles.form_element} onSubmit={handleSubmit}>
      <fieldset className={styles.contact_form_container}>
        <legend>Contact us</legend>
        <section className={styles.name_section}>
          <div className={styles.input_group}>
            <label htmlFor="expenseTitle">Expense Title</label>
            <input
              type="text"
              name="expenseTitle"
              placeholder="Enter the title of your expense"
              className={styles.input_element}
              onChange={handleChange}
            />
            <p>{errors.expenseTitleError}</p>
          </div>

          <div className={styles.input_group}>
            <label htmlFor="expenseAmount">Expense Amount</label>
            <input
              type="text"
              name="expenseAmount"
              placeholder="Enter the amount"
              className={styles.input_element}
              onChange={handleChange}
            />
            <p>{errors.expenseAmountError}</p>
          </div>
        </section>
        <section className={styles.contact_section}>
          <div className={styles.input_group}>
            <label htmlFor="expenseDate">Date</label>
            <input
              type="date"
              name="expenseDate"
              placeholder="Enter the date"
              className={styles.input_element}
              onChange={handleChange}
            />
            <p>{errors.expenseDateError}</p>
          </div>

          <div className={styles.input_group}>
            <label htmlFor="expenseCategory">Type of expense</label>
            <select
              name="expenseCategory"
              class="expenseCategory"
              className={styles.input_element}
              onChange={handleChange}
              required
            >
              <option value="housing">Housing</option>
              <option value="grocery">Grocery</option>
              <option value="transportation">Transportation</option>
              <option value="clothes">Clothes</option>
              <option value="other">Other</option>
            </select>
          </div>
        </section>
        
        <button type="submit" className={styles.submit_button}>
          Submit
        </button>
      </fieldset>
    </form>
  );
}

export default ExpenseForm;
