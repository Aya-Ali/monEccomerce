import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingHome() {
    return (
        <div className="flex flex-wrap">

            {
                Array.from({ length: 5 }).map((el) => {
                    return <div className="flex flex-col space-y-3 bg-red-700">
                        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                })
            }
        </div>
    )
}
