import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <div id="modal-root"></div>
        { children }
      </body>
    </html>
  );
}
