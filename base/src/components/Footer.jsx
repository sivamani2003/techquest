import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { RiFacebookFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
const Footer = () => {
  return (
    <div className='footer'>
      <footer>
        <div className='container1'>
          <div className='sec aboutus'>
            <h2>About us</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam accusantium ipsum voluptates corrupti itaque deserunt eligendi, animi rerum tempora id! Unde exercitationem, temporibus nam alias, adipisci nisi ut recusandae nihil dignissimos quas voluptas, numquam soluta voluptatum saepe voluptatibus ratione laboriosam!</p>
          <ul className='sci'>
            <li><a href=""></a><RiFacebookFill  className='i' /></li>
            <li><a href=""></a><FaInstagram  className='i' /></li>
            <li><a href=""></a><FaTwitter  className='i'  /></li>
            <li><a href=""></a><FaYoutube  className='i'  /></li>
          </ul>
          </div>
          <div className='sec quicklinks i' ><h2>Home</h2></div>
          <div className='sec quicklinks i'><h2>Appointment</h2></div>
          <div className='sec contact i'>
            <h2>Contact</h2>
            <ul className='info i'>
              <li>
                <span><FaPhoneAlt /></span><p><a href="#">+91 9849713249</a></p>
              </li>
              <li>
                <span><IoMdMail /></span><p><a href="#">pavan3457.us@gmail.com</a></p>
              </li>
            </ul>
            </div>
        </div>
      </footer>
      <div className='copy-right'>Copyright 2024 404 Not Found.All right reseverd</div>
    </div>
  )
}

export default Footer
