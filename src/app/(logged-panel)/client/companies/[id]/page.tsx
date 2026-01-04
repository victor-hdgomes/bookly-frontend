"use client";

import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useCompanyBySlug } from "./_hooks/useCompanyBySlug";
import { useCompanyServices } from "./_hooks/useCompanyServices";
import { useCompanyEmployees } from "./_hooks/useCompanyEmployees";
import { useAvailableSlots } from "./_hooks/useAvailableSlots";
import { useBookingState } from "./_hooks/useBookingState";
import { useBookingNavigation } from "./_hooks/useBookingNavigation";
import { useBookingConfirmation } from "./_hooks/useBookingConfirmation";
import { ServiceStep } from "./_components/ServiceStep";
import { ProfessionalStep } from "./_components/ProfessionalStep";
import { DateTimeStep } from "./_components/DateTimeStep";
import { ConfirmStep } from "./_components/ConfirmStep";
import { SuccessScreen } from "./_components/SuccessScreen";
import { BookingHeader } from "./_components/BookingHeader";
import { ProgressIndicator } from "./_components/ProgressIndicator";
import { LoadingState, ErrorState } from "@/components/states";
import { format } from "date-fns";
import { BookingStep } from "./_hooks/useBookingState";

export default function BookingPage() {
  const params = useParams();
  const { t } = useTranslation("booking");
  const companySlug = params.id as string;

  const bookingState = useBookingState();
  const {
    currentStep,
    selectedService,
    selectedEmployeeId,
    selectedDate,
    selectedTime,
    notes,
    showSuccess,
    setCurrentStep,
    setSelectedService,
    setSelectedEmployeeId,
    setSelectedDate,
    setSelectedTime,
    setNotes,
    setShowSuccess,
  } = bookingState;

  const { data: company, isLoading: isLoadingCompany, error: companyError } = useCompanyBySlug(companySlug);
  const { data: serviceGroups, isLoading: isLoadingServices } = useCompanyServices(companySlug);
  const { data: employees, isLoading: isLoadingEmployees } = useCompanyEmployees(companySlug);
  
  const { data: availableSlots, isLoading: isLoadingSlots } = useAvailableSlots(
    companySlug,
    selectedDate ? format(selectedDate, "yyyy-MM-dd") : null,
    selectedService?.id || null,
    selectedEmployeeId || null
  );

  const navigation = useBookingNavigation({
    currentStep,
    setCurrentStep,
    setSelectedService,
    setSelectedEmployeeId,
    setSelectedDate,
    setSelectedTime,
  });

  const { handleConfirm, isLoading: isConfirming } = useBookingConfirmation({
    company,
    selectedService,
    selectedDate,
    selectedTime,
    selectedEmployeeId,
    notes,
    setShowSuccess,
  });

  const renderStepContent = () => {
    const stepComponents = {
      [BookingStep.SERVICE]: serviceGroups && (
        <ServiceStep
          serviceGroups={serviceGroups}
          selectedServiceId={selectedService?.id || null}
          onSelectService={(service) => 
            navigation.handleStepChange(service, navigation.setSelectedService, BookingStep.PROFESSIONAL)
          }
        />
      ),
      [BookingStep.PROFESSIONAL]: employees && (
        <ProfessionalStep
          employees={employees}
          selectedEmployeeId={selectedEmployeeId}
          onSelectEmployee={(employeeId) =>
            navigation.handleStepChange(employeeId, navigation.setSelectedEmployeeId, BookingStep.DATE_TIME)
          }
        />
      ),
      [BookingStep.DATE_TIME]: (
        <DateTimeStep
          availableSlots={availableSlots || []}
          isLoadingSlots={isLoadingSlots}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onSelectDate={(date) =>
            navigation.handleStepChange(date, navigation.setSelectedDate, BookingStep.DATE_TIME, () =>
              navigation.setSelectedTime(null)
            )
          }
          onSelectTime={(time) =>
            navigation.handleStepChange(time, navigation.setSelectedTime, BookingStep.CONFIRM)
          }
        />
      ),
      [BookingStep.CONFIRM]: selectedService && selectedDate && selectedTime && (
        <ConfirmStep
          service={selectedService}
          employee={employees?.find(e => e.id === selectedEmployeeId) || null}
          date={selectedDate}
          time={selectedTime}
          notes={notes}
          onNotesChange={setNotes}
          onConfirm={handleConfirm}
          isLoading={isConfirming}
        />
      ),
    };

    return stepComponents[currentStep];
  };

  if (isLoadingCompany || isLoadingServices || isLoadingEmployees) {
    return <LoadingState message={t("navigation.loading")} />;
  }

  if (companyError || !company) {
    return <ErrorState title="Erro" description="Empresa não encontrada" />;
  }

  if (showSuccess) {
    return <SuccessScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <BookingHeader company={company} onBack={navigation.handleBack} />
      
      <div className="max-w-2xl mx-auto px-4 pb-4">
        <ProgressIndicator currentStep={currentStep} />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {renderStepContent()}
      </div>
    </div>
  );
}