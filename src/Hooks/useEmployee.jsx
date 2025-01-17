import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

export const useEmployee = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isEmployee, isLoading: isEmployeeLoading } = useQuery({
        queryKey: ['employeeCheck', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/employee/${user?.email}`);
                return res.data?.employee;
            } catch (error) {
                console.error('Employee check failed:', error);
                return false;
            }
        }
    });
    return [isEmployee, isEmployeeLoading];
};
