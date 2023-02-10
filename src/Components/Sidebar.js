import React, { useEffect, useState } from "react";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import "./Sidebar.css";
import {
  Logout,
  Search,
} from "@mui/icons-material";
import Userprofile from "./Userprofile";
import db from "../firebase";
import { Switch } from "@mui/material";
function Sidebar({ currentUser, signOut}) {
  const [allUsers, setAllUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [friendList, setFriendList] = useState([]);
  const[theme,setTheme]=useState("light-theme")

  //to perfrom background works

  useEffect(() => {
    const getAllUser = async () => {
      const data = await db.collection("users").onSnapshot((snapshot) => {
        //  console.log(snapshot.docs);
        setAllUsers(
          snapshot.docs.filter((doc) => doc.data().email !== currentUser.email)
        );
      });
    };

    const getFriend = async () => {
      const data = await db
        .collection("FriendList")
        .doc(currentUser.email)
        .collection("list")
        .onSnapshot((snapshot) => {
          //  console.log(snapshot.docs);
          setFriendList(snapshot.docs);
        });
    };

    getAllUser();
    getFriend();
  }, []);
  // console.log(allUsers);

  const searchUSer = allUsers.filter((user) => {
    if (searchInput) {
      if (
        user.data().fullname.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        // console.log(user.data().fullname);
        return user;
      }
    }
  });

  const searchItem = searchUSer.map((user) => {
    return (
      <Userprofile
        name={user.data().fullname}
        photoURL={user.data.photoURL}
        key={user.id}
        email={user.data().email}
      />
    );
  });
  const themeChanger=()=>{
    if(theme ==='dark-theme'){
      setTheme('light-theme')
    }
    else{
      setTheme('dark-theme')
    }
  }
  useEffect(()=>{
  document.body.className=theme;
  
  },[theme])
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-img">
          <img src={currentUser?.photoURL} alt="" />
        </div>
        <div className="sidebar-header-btn">
          <Switch
            onClick={ themeChanger}
            inputProps={{ "aria-label": "controlled" }}
          />
          <InsertCommentIcon />
          <Logout onClick={signOut} />
        </div>
      </div>

      <div className="sidebar-search">
        <div className="sidebar-search-input">
          <Search />
          <input
            type="text"
            name="search"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      <div className="sidebar-chat-list">
        {searchItem.length > 0
          ? searchItem
          : friendList.map((friend) => (
              <Userprofile
                name={friend.data().fullname}
                photoURL={friend.data().photoURL}
                lastMessage={friend.data().lastMessage}
                key={friend + "2"}
                email={friend.data().email}
              />
            ))}
      </div>
    </div>
  );
}

export default Sidebar;
