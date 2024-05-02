import React from "react";
import styled from "styled-components";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const handleScrollToTop = () => {
    // Scroll to the top of the window with smooth effect
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <FooterContainer>
      <FooterContent>
        <Logo>
          <h1 style={{
            fontSize: "40px",
            fontWeight: "bolder",
            fontStyle: "italic",
            fontFamily: "cursive",
            color: "darkorange",
            marginBottom: "20px" /* Add bottom margin for spacing */
          }}>QuitQ</h1>
        </Logo>
        <FooterLinks>
          <FooterLink to="/" onClick={handleScrollToTop}>Home</FooterLink>
          <FooterLink to="/products" onClick={handleScrollToTop}>Shop</FooterLink>
          <FooterLink to="/about" onClick={handleScrollToTop}>About Us</FooterLink>
          <FooterLink to="/contact" onClick={handleScrollToTop}>Contact</FooterLink>
        </FooterLinks>
        <SocialIcons>
          <FaFacebook />
          <FaTwitter />
          <FaInstagram />
        </SocialIcons>
      </FooterContent>
      <FooterBottom>
        <p>&copy; {new Date().getFullYear()} QuitQ. All rights reserved.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 2rem 0;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  margin-bottom: 1rem;
  h1 {
    font-size: 1.5rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  transition: color 0.3s;
  &:hover {
    color: #ccc;
  }
  cursor: pointer; /* Add cursor pointer */
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.5rem;
`;

const FooterBottom = styled.div`
  text-align: center;
  margin-top: 1rem;
  p {
    font-size: 0.9rem;
  }
`;

export default Footer;
