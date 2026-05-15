import "./NoticePage.css";

import CreateNotice
from "../components/CreateNotice";

import NoticeList
from "../components/NoticeList";

const NoticePage = () => {

  return (

    <div className="noticePage">

      <div className="noticeContainer">

        <CreateNotice />

        <NoticeList />

      </div>

    </div>

  );
};

export default NoticePage;