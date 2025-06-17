import Header from "./_components/Header";
import "@/app/_styles/styles.css"
// import '@/app/_styles/globals.css';


export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome to Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="body-layout">
        <div className =" container1">
          <Header />
          <main className="main-container">{children}</main>
        </div>
      </body>
    </html>
  );
}
