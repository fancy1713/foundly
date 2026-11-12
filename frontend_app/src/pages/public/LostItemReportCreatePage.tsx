import LostItemStepperForm from "@/components/forms/LostItemStepperForm";
import PublicPageShell from "@/components/public/PublicPageShell";

const LostItemReportCreatePage = () => {
  return (
    <PublicPageShell showBack title="Form Kehilangan">
      <LostItemStepperForm />
    </PublicPageShell>
  );
};

export default LostItemReportCreatePage;
