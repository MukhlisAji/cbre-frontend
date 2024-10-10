const ACCOUNTCOLUMN = [
    { "label": "Account Name", "accessor": "accountName", "isClickable": true, "url": "details" },
    { "label": "Local Account Name", "accessor": "localAccountName", "isClickable": false },
    { "label": "Billing Country", "accessor": "billingCountry", "isClickable": false },
    { "label": "Billing State", "accessor": "billingState", "isClickable": false },
    { "label": "Billing City", "accessor": "billingCity", "isClickable": false },
    { "label": "Billing Street", "accessor": "billingStreet", "isClickable": false },
    { "label": "Billing Post Code", "accessor": "billingPostCode", "isClickable": false }
]

const CONTACTCOLUMN = [
    { "label": "First Name", "accessor": "firstname", "isClickable": true, "url": "details" },
    { "label": "Last Name", "accessor": "lastname", "isClickable": false },
    { "label": "Email", "accessor": "email", "isClickable": false },
    { "label": "Business Phone", "accessor": "businessPhone", "isClickable": false },
    { "label": "Mobile Phone", "accessor": "mobilePhone", "isClickable": false },
    { "label": "Mailing Country", "accessor": "mailingCountry", "isClickable": false },
    { "label": "Mailing State", "accessor": "mailingState", "isClickable": false },
    { "label": "Mailing City", "accessor": "mailingCity", "isClickable": false },
    { "label": "Mailing Street", "accessor": "mailingStreet", "isClickable": false },
    { "label": "Mailing Post Code", "accessor": "mailingPostCode", "isClickable": false },
    { "label": "Status", "accessor": "status", "isClickable": false },
    { "label": "Account Name", "accessor": "accountName", "isClickable": false }
];

const PROPERTYCATEGORIES = [
    {
        title: "Basic Information",
        items: [
            { color: "purple-500", label: "Basic Information" },
            { color: "blue-500", label: "General Information" },
            { color: "red-500", label: "Property Account and Contacts" },
            { color: "blue-500", label: "Standards" },
            { color: "yellow-500", label: "Public Transportation" },
            { color: "orange-500", label: "Property Management" },
            { color: "pink-500", label: "Elevators" },
            { color: "purple-500", label: "Parking" },
            { color: "green-500", label: "Specifications" },
            { color: "yellow-500", label: "Ancillary Facilities" },
            { color: "teal-500", label: "Airconditioning" },
            { color: "gray-400", label: "Office Information" },
            { color: "red-400", label: "Industrial Information" },
            { color: "gray-400", label: "Retail Information" },
            { color: "blue-400", label: "Agency" },
            { color: "gray-400", label: "Notification Log" },
        ],
    },
];

const PROPERTYDETAILS = {
    sections: [
        {
            title: "Basic Information",
            fields: [
                { label: "Building Name", value: "East Coast Centre (ECC)" },
                { label: "Grade", value: "-" },
                { label: "Street Address", value: "280 Kampong Arang Road, Singapore 438180" },
                { label: "Property Type", value: "Industrial" },
                { label: "Property Sub-Type", value: "Industrial: -" },
                { label: "Region / Micro Market", value: "Central - Kallang / Geylang" },
                { label: "Zoning", value: "Residential" },
                { label: "Property Usage", value: "Industrial and Retail" },
                { label: "Ownership Structure/Title", value: "Leasehold" },
                { label: "Property Status", value: "-" },
                { label: "Created By", value: "AP\\PArora7" },
                { label: "Created", value: "20/07/2023 17:37" },
                { label: "Modified By", value: "AP\\PArora7" },
                { label: "Modified", value: "20/07/2023 17:37" }
            ]
        },
        {
            title: "General Information",
            fields: [
                { label: "TOP Date", value: "" },
                { label: "Expected TOP Date", value: "" },
                { label: "CSC Date", value: "" },
                { label: "Refurbishment Completion Date", value: "" },
                { label: "Refurbishment Date", value: "" },
                { label: "Expected Refurbishment Date", value: "" }
            ]
        }
    ]
};


export { ACCOUNTCOLUMN, CONTACTCOLUMN, PROPERTYCATEGORIES, PROPERTYDETAILS };