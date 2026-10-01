import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import CashLoan from "@/components/CashLoan";
import Feedback from "@/components/Feedback";
import Conditions from "@/components/Conditions";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatButtons from "@/components/FloatButtons";
import { dict } from "@/i18n/dictionaries";

export default function Home() {
  return (
    <>
      <Header dict={dict} />
      <main>
        <Hero dict={dict} />
        <WhyUs dict={dict} />
        <CashLoan dict={dict} />
        <Feedback dict={dict} />
        <Conditions dict={dict} />
        <Contact dict={dict} />
      </main>
      <Footer dict={dict} />
      <FloatButtons dict={dict} />
    </>
  );
}
