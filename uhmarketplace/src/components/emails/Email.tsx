import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface CoogbayEmailTokenProps {
  url?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const CoogbayAccessToken = ({
  url,
}: CoogbayEmailTokenProps) => (
  <Html>
    <Head />
    <Preview>
      Coogbay Email Verification
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://upload.wikimedia.org/wikipedia/commons/2/2a/University_of_Houston_Logo.svg`}
          width="32"
          height="32"
          alt="Coogbay"
        />

        <Section style={section}>
          <Text style={text}>
            An account was created under this email for Coogbay. If you did not create an
            account, please disregard.
          </Text>

          <Link href={url}>
            Verify your Email
          </Link>
        </Section>

        <Text style={footer}>
          Coogbay
        </Text>
      </Container>
    </Body>
  </Html>
);

export default CoogbayAccessToken;

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  maxWidth: "480px",
  margin: "0 auto",
  padding: "20px 0 48px",
};

const title = {
  fontSize: "24px",
  lineHeight: 1.25,
};

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center" as const,
};

const text = {
  margin: "0 0 10px 0",
  textAlign: "left" as const,
};

const button = {
  fontSize: "14px",
  backgroundColor: "#C8102E",
  color: "#fff",
  lineHeight: 1.5,
  borderRadius: "0.5em",
  padding: "12px 24px",
};

const links = {
  textAlign: "center" as const,
};

const link = {
  color: "#0366d6",
  fontSize: "12px",
};

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "60px",
};
