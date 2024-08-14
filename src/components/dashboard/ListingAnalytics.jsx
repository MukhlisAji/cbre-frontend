import React from 'react'

export default function ListingAnalytics() {
    return (
        <div>
            <span>Listing Analytics</span>
            <div className="grid grid-cols-3 gap-4 w-full">
                <div className="bg-c-teal flex flex-col justify-between items-center p-4">
                    <div className="flex-grow flex items-center justify-center">
                        Vacancies
                    </div>
                </div>
                <div className="bg-c-teal flex flex-col justify-between items-center p-4">
                    <div className="flex-grow flex items-center justify-center">
                        Availability Status
                    </div>
                </div>
                <div className="bg-c-teal flex flex-col justify-between items-center p-4">
                    <span>Total No of Listings</span>
                    <div className="flex-grow flex items-center justify-center">
                        1231
                    </div>
                </div>
            </div>
        </div>

    )
}
