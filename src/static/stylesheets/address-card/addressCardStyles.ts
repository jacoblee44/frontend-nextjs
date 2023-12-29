import { css } from "@emotion/css";

interface AddressCardStylesProps {
  image?: string,
}

export const useAddressCardStyles = (props: AddressCardStylesProps) => ({
  root: css`
    .card {
      width: 100%;
      background: #FAFAFA 0% 0% no-repeat padding-box;
      border: 1px solid #bebebe;
      border-radius: 10px;

      .top {
        height: 75px;
        background-image: url(${props?.image});
        border-radius: 10px 10px 0px 0px;
        background-size: cover;
        background-position: center;
      }

      .content {
        display: flex;
        padding: 10px 15px;
        align-items: center;

        h2 {
          font-size: 17px;
          font-weight: normal;
          font-family: 'Urbanist', serif;
        }

        p {
          font-size: 18px;
          font-family: 'Urbanist', serif;
        }
      }
    }
  `,

});
