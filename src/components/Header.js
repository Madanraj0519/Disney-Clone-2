import React, { useEffect } from 'react';
import styled from "styled-components";
import { auth, provider } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";
import {
    selectUserName,
    selectUserPhoto,
    setUserLoginDetails,
    setSignOut,
} from "../features/User/userSlice"


const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);


    //To check whether the user are currently logged in or not
    useEffect(() => {
        auth.onAuthStateChanged( async(user) => {
            if(user) {
                setUser(user);
                navigate('/home');
            }
        });
    },[userName]);


    // handle SignIn with google popup
    const handleAuth = () => {
        if(!userName){
            auth.signInWithPopup(provider)
            .then((result) => {
                setUser(result.user);
            }).catch((error) => {
                alert(error.message);
            });
        } else if(userName){
            auth.signOut()
            .then(() => {
                dispatch(setSignOut());
                navigate("/");
            })
            .catch((error) => {
                alert(error.message);
            });
        }
    };

    const setUser = (user) => {
        dispatch(
            setUserLoginDetails({
                name:  user.displayName,
                email: user.email,
                photo: user.photoURL,
            })
        )
    }
   

    // created a array to store the Nav menu elements
    const NavMenuElements =[
        {
            id:1,
            img:"/disney-images/images/home-icon.svg",
            href:"/home",
            title:"HOME"
        },
        {
            id:2,
            img:"/disney-images/images/search-icon.svg",
            href:"",
            title:"SEARCH"
        },
        {
            id:3,
            img:"/disney-images/images/watchlist-icon.svg",
            href:"",
            title:"WATCHLIST"
        },
        {
            id:4,
            img:"/disney-images/images/original-icon.svg",
            href:"",
            title:"ORIGINAL"
        },
        {
            id:5,
            img:"/disney-images/images/movie-icon.svg",
            href:"",
            title:"MOVIES"
        },
        {
            id:6,
            img:"/disney-images/images/series-icon.svg",
            href:"",
            title:"SERIES"
        },
    ];

  return (
    <Nav>
        <Logo>
            <img src='/disney-images/images/logo.svg' alt='Disney+'/>
        </Logo>
        {
            !userName ? 
            <Login onClick={handleAuth}>
               Login
            </Login>
           :
            <>
            <NavMenu>
             {/* mapping the navMEnu element */}
            {
             NavMenuElements.map((menu) => (
              <a href={menu.href}>
                <img src={menu.img} alt={menu.title} />
                <span>{menu.title}</span>
              </a>
              ))
            }            
            </NavMenu>
            <SignOut>
                <UserImg src={userPhoto} alt={userName} />
                <DropDown>
                  <span onClick={handleAuth}>Sign out</span>
                </DropDown>
            </SignOut>
            </>
        }
    </Nav>
  );
};

 const Nav = styled.nav`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   height: 70px;
   background-color: #090b13;
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0 36px;
   letter-spacing: 16px;
   z-index: 3;
 `;

 const Logo = styled.div`
  padding: 0 ;
  width: 90px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img{
    display: block;
    width: 100%;
  }
 `;


 const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 45px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    gap:4px;

    img {
        height: 20px;
        min-width: 20px;
        width: 20px;
        z-index: auto;
    }
   
   span {
    color: rgb(249, 249, 249);
    font-size: 15px;
    letter-spacing: 1.42px;
    line-height: 1.08;
    padding: 2px 0px;
    white-space: nowrap;
    position: relative;

    &:before{
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
    }
   }

   &:hover{
    span:before{
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
    }
   }
  }
 `;

 const Login = styled.a`
     background-color: rgba(0, 0, 0, 0.6);
     padding: 8px 16px;
     text-transform: uppercase;
     letter-spacing: 1.5px;
     border: 1px solid #f9f9f9;
     border-radius: 4px;
     transition: all 0.2s ease 0s;
     cursor: pointer;

      &:hover {
       background-color: #f9f9f9;
       color: #000;
       border-color: transparent;
 }
 `;

 const UserImg = styled.img`
  height: 100%; 
 `;

 const DropDown = styled.div`
  position: absolute;
  top:48px;
  right:0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity:0;
 `;

 const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
        opacity:1;
        transition-duration: 1s;
    }
  }
 `;



export default Header;