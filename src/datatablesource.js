export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "address",
    headerName: "Address",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

export const quizColumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'question', 
    headerName: 'Question', 
    width: 700,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.question}
        </div>
      );
    },
  },
];

export const quizNetworkColumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'question', 
    headerName: 'Question', 
    width: 700,
  },
];

export const learningColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Title', width: 150 },
  { field: 'description', headerName: 'Description', width: 300 },
  { field: 'content', headerName: 'Content', width: 300 },
  // Add more columns as needed
];