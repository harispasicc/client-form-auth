import React, { useEffect, useState } from "react";
import "./OrderForm.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, FormGroup } from "react-bootstrap";
import TextField from "@confirmit/react-text-field";
import Select from "@confirmit/react-select";
import firebase from "../../config/firebase";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { BsCloudUpload } from "react-icons/bs";

function OrderForm() {
  const [url, setUrl] = useState("");
  const [project, setProject] = useState("");
  const [report, setReport] = useState("");
  const [slide, setSlide] = useState("");
  const [subject, setSubject] = useState("");
  const [request, setRequest] = useState("");
  const [tagSelectBox, setTagSelectBox] = useState("");
  const [tagName, setTagName] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [multipleSelectValue, setMultipleSelectValue] = useState([]);
  const [skipUrlValidation, setSkipUrlValidation] = useState(true);
  const [skipSubjectValidation, setSkipSubjectValidation] = useState(true);
  const [skipRequestValidation, setSkipRequestValidation] = useState(true);
  const [skipProjectValidation, setSkipProjectValidation] = useState(true);
  const [skipTagName, setSkipTagName] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [disableSave, setDisableSave] = useState(true);
  const [show, setShow] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showTagSuccessMessage, setTagShowSuccessMessage] = useState(false);
  const [showAttachmentSuccessMessage, setShowAttachmentSuccessMessage] =
    useState(false);
  const storage = getStorage();
  const [allTags, setAllTags] = useState([]);

  const handleClose = () => {
    console.log("close msg");
  };

  useEffect(() => {
    loadAllTagsFromDatabase();
  }, []);

  async function loadAllTagsFromDatabase() {
    try {
      let allTagsFromDB = [];
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "Tags"));
      querySnapshot.forEach((doc) => {
        allTagsFromDB.push(doc.data());
      });

      setAllTags(allTagsFromDB);
    } catch (e) {
      console.error("Error loading document: ", e);
    }
  }

  async function SaveNameTag() {
    console.log();

    try {
      let tagData = {
        TagName: tagName,
      };

      const db = getFirestore();
      const responseData = await addDoc(collection(db, "Tags"), tagData).then(
        (result) => {
          loadAllTagsFromDatabase();
          let tagSelectionCopy = [...tagSelectBox];
          tagSelectionCopy.push({
            label: tagName,
            value: tagName,
          });
          setTagSelectBox(tagSelectionCopy);
          console.log(tagSelectionCopy);
          console.log("Document written with ID: ", result.id);
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function SaveFormData(fileNames) {
    console.log(fileNames);

    try {
      let orderData = {
        Attachments: fileNames,
        Project: project,
        Report: report,
        Request: request,
        Slide: slide,
        Subject: subject,
        URL: url,
        Tags: tagSelectBox,
      };

      const db = getFirestore();
      const responseData = await addDoc(collection(db, "Orders"), orderData);
      console.log("Document written with ID: ", responseData.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const uploadFiles = (e) => {
    let fileNames = [];
    attachments.forEach((element) => {
      let uniqueName = parseInt(Math.random() * 100000) + element.name;
      fileNames.push(uniqueName);
      const storageRef = ref(storage, uniqueName);
      uploadBytes(storageRef, element).then((snapshot) => {
        console.log("Upload done");
        console.log(snapshot);
      });
    });
    SaveFormData(fileNames);
  };

  const onAttachmentChange = (e) => {
    setAttachments(Array.from(e.target.files));
    setShowAttachmentSuccessMessage(true);

    setTimeout(() => {
      setShowAttachmentSuccessMessage(false);
    }, 4000);
  };

  async function submitFormData() {
    if (checkRequiredFields()) {
      console.log("Show error messages");
    } else {
      uploadFiles();
      setShowSuccessMessage(true);
    }

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 4000);
  }
  const checkRequiredFields = () => {
    let hasErrors = true;
    if (
      project.length > 0 &&
      url.length > 0 &&
      subject.length > 0 &&
      request.length > 0
    ) {
      setDisableSubmit(false);
      console.log("enableButton");
      hasErrors = false;
    } else {
      setDisableSubmit(true);
    }
    return hasErrors;
  };

  useEffect(() => {
    checkRequiredFields();
  }, [project, url, subject, request]);

  async function submitAddedTags() {
    if (checkAddedTags()) {
      console.log("Show error messages");
    } else {
      SaveNameTag();
      setTagShowSuccessMessage(true);
    }
  }
  setTimeout(() => {
    setTagShowSuccessMessage(false);
  }, 7000);

  const checkAddedTags = () => {
    let hasErrors = true;
    if (tagName.length > 0) {
      setDisableSave(false);
      console.log("enableSave");
      hasErrors = false;
    } else {
      setDisableSave(true);
    }
    return hasErrors;
  };

  useEffect(() => {
    checkAddedTags();
  }, [tagName]);

  return (
    <Container className="Form">
      <h2 className="form-title">CC Library Form</h2>
      <Row>
        <Col>
          <fieldset className="input">
            <FormGroup controlId="formURL">
              <Form.Text className="text-muted">
                Dapresy server where this should be implemented
              </Form.Text>
              <TextField
                type="url"
                id="url"
                label="URL"
                name="URL"
                required
                className="input-field"
                helperText={
                  url.length > 0 || skipUrlValidation ? "" : "Please enter URL"
                }
                onChange={(newValue) => {
                  setUrl(newValue);
                  setSkipUrlValidation(false);
                }}
                placeholder="Enter installation URL"
                showClear={true}
                value={url}
                error={url.length > 0 || skipUrlValidation ? false : true}
              />
            </FormGroup>
          </fieldset>
        </Col>
        <Col>
          <Form.Group controlId="formProject">
            <Form.Text className="text-muted">
              Project name/code/ID where this should be imlemented
            </Form.Text>
            <TextField
              id="project"
              label="Project"
              name="Project"
              required
              className="input-field"
              helperText={
                project.length > 0 || skipProjectValidation
                  ? ""
                  : "Please enter project"
              }
              onChange={(newValue) => {
                setProject(newValue);
                setSkipProjectValidation(false);
              }}
              placeholder="Enter project name/code/ID"
              showClear={true}
              value={project}
              error={project.length > 0 || skipProjectValidation ? false : true}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="formReport">
            <Form.Text className="text-muted">
              If code applies to specific report, please specify report name/id
            </Form.Text>
            <TextField
              id="report"
              label="Report"
              name="Report"
              className="input-field"
              onChange={(newValue) => {
                setReport(newValue);
              }}
              placeholder="Enter report name/ID"
              showClear={true}
              value={report}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formSlide">
            <Form.Text className="text-muted">
              If code applies to specific slides, please specify
            </Form.Text>
            <TextField
              id="slide"
              label="Slide"
              name="Slide"
              type="text"
              min="1"
              className="input-field"
              onChange={(newValue) => {
                setSlide(newValue);
              }}
              placeholder="Enter slide number"
              showClear={true}
              value={slide}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="formSubject">
            <Form.Text className="text-muted">
              Brief description of your request
            </Form.Text>
            <TextField
              id="subject"
              label="Subject"
              name="Subject"
              required
              className="input-field"
              helperText={
                subject.length > 0 || skipSubjectValidation
                  ? ""
                  : "Please enter subject"
              }
              onChange={(newValue) => {
                setSubject(newValue);
                setSkipSubjectValidation(false);
              }}
              placeholder="Enter subject"
              showClear={true}
              value={subject}
              error={subject.length > 0 || skipSubjectValidation ? false : true}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="formRequest">
            <Form.Text className="text-muted">
              Please fill in all details of your request, you may also attach a
              pdf/doc etc with full details
            </Form.Text>
            <TextField
              id="request"
              label="Request"
              name="Request"
              required
              className="input-field"
              helperText={
                request.length > 0 || skipRequestValidation
                  ? ""
                  : "Please enter request"
              }
              onChange={(newValue) => {
                setRequest(newValue);
                setSkipRequestValidation(false);
              }}
              placeholder="Request"
              showClear={true}
              value={request}
              error={request.length > 0 || skipRequestValidation ? false : true}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Text className="text-muted">Please select tag</Form.Text>
          <div className="SelectBox" id="SelectBox">
            <Select
              id="tag-box"
              value={multipleSelectValue}
              placeholder="Tags"
              className="tagSelectBox"
              isMulti={true}
              isSearchable={true}
              isClearable={true}
              multiple
              onChange={(newValue) => {
                setTagSelectBox(newValue);
                setMultipleSelectValue();
                console.log("selected tag is : ", newValue);
              }}
              showClear={true}
              value={tagSelectBox}
            >
              {allTags.map((item) => (
                <Select.Option key={item.TagName} value={item.TagName}>
                  {item.TagName}
                </Select.Option>
              ))}
            </Select>
            <div className="btn-newTag-wrapper">
              <button
                type="submit"
                className="btn btn-primary btn-sx btn-addNewTag"
                id="NewTags"
                onClick={() => setShow(!show)}
              >
                + New tag
              </button>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          {show ? (
            <Form.Text className="text-muted">Please add tag</Form.Text>
          ) : null}
          <div className="tagNameBox">
            {show ? (
              <TextField
                id="tagName"
                label="Tag Name"
                name="tag-Name-Box"
                className="tagNameBox"
                helperText={tagName.length > 0 || skipTagName ? "" : ""}
                onChange={(newValue) => {
                  setTagName(newValue);
                  setSkipTagName(false);
                }}
                value={tagName}
                showClear={true}
              />
            ) : null}
            {show ? (
              <div className="btn-saveTag-wrapper">
                <button
                  type="save"
                  className="btn btn-primary btn-sx btn-save"
                  id="saveTag"
                  onClick={submitAddedTags}
                  disabled={disableSave}
                >
                  Save tag
                </button>
              </div>
            ) : null}
          </div>
          {showTagSuccessMessage && (
            <div>
              <div
                class="alert alert-success alert-dismissible fade show shadow"
                role="alert"
              >
                <strong>Tag added successfully</strong>
              </div>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="formAttachments">
            <Form.Text className="text-muted">
              Max 10 files and 10 mb per file
            </Form.Text>
            <div className="uploadIcon">
              <input
                id="upload-file"
                className="attachmentsBlock"
                name="file"
                type="file"
                multiple
                onChange={onAttachmentChange}
              />
              <label for="upload-file">
                <BsCloudUpload className="uploadFilesIcon" />
              </label>
            </div>
            {showAttachmentSuccessMessage && (
              <div>
                <div
                  class="alert alert-success alert-dismissible fade show shadow"
                  role="alert"
                >
                  <strong> Attachment added successfully</strong>
                </div>
              </div>
            )}
          </Form.Group>
        </Col>
      </Row>
      <div className="btn-submit-wrapper">
        <button
          type="submit"
          className="btn btn-primary btn-sx btn-submit"
          onClick={submitFormData}
          id="submit"
          disabled={disableSubmit}
        >
          Submit
        </button>
      </div>
      {showSuccessMessage && (
        <div>
          <div class="alert alert-success alert-dismissible fade show shadow">
            <strong>Submitted successfully</strong>
          </div>
        </div>
      )}
    </Container>
  );
}

export default OrderForm;
