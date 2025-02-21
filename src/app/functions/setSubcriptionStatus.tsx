export default function setSubscriptionStatus(end_date: Date): boolean {
    const today = new Date();
    
    today.setHours(0, 0, 0, 0);

    return end_date >= today ? true : false;
}
