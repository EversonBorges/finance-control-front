import { Typography } from "@material-tailwind/react";

function SummaryMonthSkeleton() {
    return (
        <div className="max-w-full animate-pulse">
            {

                <div className=' flex pt-1 flex-col items-center rounded-lg bg-gray-300 dark:bg-dark-200 shadow-gray-900 dark:shadow-gray-500 shadow-sm '>
                   
                    <Typography
                        as="div"
                        variant="h1"
                        className="mb-4  h-3 w-10 bg-gray-800 dark:bg-gray-100 rounded-full"
                    >
                        &nbsp;
                    </Typography>
                    <Typography
                        as="div"
                        variant="paragraph"
                        className="mb-2 h-2 w-40 rounded-full bg-gray-800 dark:bg-gray-100"
                    >
                        &nbsp;
                    </Typography>
                    <Typography
                        as="div"
                        variant="paragraph"
                        className="mb-2 h-2 w-40 rounded-full bg-gray-800 dark:bg-gray-100"
                    >
                        &nbsp;
                    </Typography>
                    <Typography
                        as="div"
                        variant="paragraph"
                        className="mb-2 h-2 w-40 rounded-full bg-gray-800 dark:bg-gray-100"
                    >
                        &nbsp;
                    </Typography>
                    <tr className="border-t border-black dark:border-white  w-3/4 mx-auto" style={{ height: '2px' }} />
                    <Typography
                        as="div"
                        variant="paragraph"
                        className="mb-2 h-2 w-40 rounded-full bg-gray-800 dark:bg-gray-100"
                    >
                        &nbsp;
                    </Typography>
                    <Typography
                        as="div"
                        variant="paragraph"
                        className="mb-2 h-2 w-40 rounded-full bg-gray-800 dark:bg-gray-100 "
                    >
                        &nbsp;
                    </Typography>
                    <Typography
                        as="div"
                        variant="paragraph"
                        className="mb-2 h-2 w-40 rounded-full bg-gray-800 dark:bg-gray-100 "
                    >
                        &nbsp;
                    </Typography>
                </div>
            }
        </div>
    );
}

export default SummaryMonthSkeleton