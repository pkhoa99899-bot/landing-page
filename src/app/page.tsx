import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import CashLoan from "@/components/CashLoan";
import Feedback from "@/components/Feedback";
import Conditions from "@/components/Conditions";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatButtons from "@/components/FloatButtons";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyUs />
        <CashLoan />
        <Feedback />
        <Conditions />
        <Contact />
      </main>
      <Footer />
      <FloatButtons />
    </>
  );
}
