import React, { useState, useEffect, useMemo, useRef } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Table from "@confirmit/react-table";
import { useAuth } from "../../contexts/AuthContext";
import "./CCLibrary.css";

export default function CCLibrary() {
  const [tableData, setTableData] = useState([]);
  const [attachmentDownloadURL, setAttachmentDownloadURL] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    const db = getFirestore();
    return onSnapshot(collection(db, "Orders"), (snapshot) => {
      setTableData(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  const myRefname = useRef(null);

  function handleAttachmentClick(attachment) {
    const storage = getStorage();
    getDownloadURL(ref(storage, attachment)).then((url) => {
      setAttachmentDownloadURL(url);
      myRefname.current.click();

      console.log(url);
    });
  }

  const columns = useMemo(
    () => [
      {
        Header: "URL",
        accessor: "URL",
        width: 80,
      },
      {
        Header: "Project",
        accessor: "Project",
        width: 60,
      },
      {
        Header: "Report",
        accessor: "Report",
        width: 60,
      },
      {
        Header: "Slide",
        accessor: "Slide",
        width: 60,
      },
      {
        Header: "Subject",
        accessor: "Subject",
        width: 60,
      },
      {
        Header: "Request",
        accessor: "Request",
        width: 60,
      },
      {
        Header: "Tags",
        width: 80,
        Cell: function tableTags({ row }) {
          return (
            <div>
              {row.original.Tags.length > 0 &&
                row.original.Tags.map((data, index) => {
                  return (
                    <div className="table-tag">
                      <span className="tag-btn" key={index}>
                        {data.label}
                      </span>
                    </div>
                  );
                })}
            </div>
          );
        },
      },
      {
        Header: "Attachments",
        accessor: "Attachments",
        width: 100,
        Cell: function tableAttachments({ row }) {
          return (
            <div className="att-row">
              {row.original.Attachments.length > 0 &&
                row.original.Attachments.map((attachment) => (
                  <span className="table-attachments" key={attachment}>
                    <button
                      className="attachment-btn"
                      onClick={() => {
                        handleAttachmentClick(attachment);
                      }}
                    >
                      {attachment}
                    </button>
                  </span>
                ))}
            </div>
          );
        },
      },
    ],
    []
  );
  console.log("table data");

  return (
    <>
      {currentUser && (
        <Container className="CC-Table">
          <h2 className="CC-Library-title">CC Library</h2>
          <a
            className="table-atag"
            href={attachmentDownloadURL}
            download
            ref={myRefname}
            target="_blank"
          ></a>
          <Table
            className="table"
            content={<Table.Content columns={columns} data={tableData} />}
          ></Table>
        </Container>
      )}
    </>
  );
}
