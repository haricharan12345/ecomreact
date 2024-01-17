import styled from "styled-components";

const Contact = () => {
  const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    
    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

  return (<Wrapper>

    <h2  className="commom-heading">Contact Page</h2>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10744.036623979899!2d77.49828547078474!3d12.919873060520667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3ee3b392fd17%3A0xb743818991bdb8fa!2sSonata%20Software%20Ltd!5e0!3m2!1sen!2sin!4v1690452821469!5m2!1sen!2sin" 
    width="100%" height="450" 
  style={{border:0 }}
  allowFullScreen="" 
    loading="lazy" 
    referrerpolicy="no-referrer-when-downgrade">

    </iframe>
<div className="container">
  <div className="contact-form">
    <form action="https://formspree.io/f/xdorkqwq" method="POST" className="contact-inputs">
      <input type="text"
       placeholder="username" 
       name="username" 
      required
      autoComplete="off"/>

      <input type="email" name="Email"
      placeholder="Email.."
      autoComplete="off"
      required
     />

      <textarea placeholder="enter your message"
      cols="30"
      rows="10"
      required
      autoComplete="off"
      name="message">
      </textarea>
      
      <input type="submit" value="send"/>


    </form>
  </div>
</div>

  </Wrapper>
  
  );
};

export default Contact;
