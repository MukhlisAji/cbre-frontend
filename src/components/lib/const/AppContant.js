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
            { color: "purple-500", label: "basicInformation", displayLabel: "Basic Information" },
            { color: "blue-500", label: "generalInformation", displayLabel: "General Information" },
            { color: "red-500", label: "propertyAccountAndContacts", displayLabel: "Property Account and Contacts" },
            { color: "blue-500", label: "standards", displayLabel: "Standards" },
            { color: "yellow-500", label: "publicTransportation", displayLabel: "Public Transportation" },
            { color: "orange-500", label: "propertyManagement", displayLabel: "Property Management" },
            { color: "pink-500", label: "elevators", displayLabel: "Elevators" },
            { color: "purple-500", label: "parking", displayLabel: "Parking" },
            { color: "green-500", label: "specifications", displayLabel: "Specifications" },
            { color: "yellow-500", label: "ancillaryFacilities", displayLabel: "Ancillary Facilities" },
            { color: "teal-500", label: "airCondition", displayLabel: "Airconditioning" },
            { color: "gray-400", label: "officeInformation", displayLabel: "Office Information" },
            { color: "red-500", label: "industrialInformation", displayLabel: "Industrial Information" },
            { color: "gray-400", label: "retailInformation", displayLabel: "Retail Information" },
            { color: "blue-500", label: "agency", displayLabel: "Agency" },
            { color: "gray-400", label: "notificationLog", displayLabel: "Notification Log" },
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
        },
        {
            title: "Parking",
            fields: [
                { label: "Car Park Lots", value: "" },
                { label: "Allocation Ratio", value: "1: Sq Ft leased" },
                { label: "Parking Details", value: "Lorry Lots:\nMotorcycle Lots:" },
                { label: "Parking Fee (Subject to GST)", value: "Seasonal: S$ /lot/mth\nNon-Reserved: S$ /lot/mth" }
            ]
        },
        {
            title: "Public Transportation",
            fields: [
                { label: "MRT1", value: "Covered Access Walk" },
                { label: "MRT2", value: "Covered Access Walk" },
                { label: "MRT3", value: "Covered Access Walk" },
                { label: "BUS", value: "Others" }
            ]
        },
        {
            title: "Standards",
            fields: [
                { label: "Green Mark", value: "WELLS" },
                { label: "LEED Certification", value: "No\nWiredscore" }
            ]
        },
        {
            title: "Property Management",
            fields: [
                { label: "PM In-House", value: "", type: "checkbox" }, // Checkbox field for in-house management
                { label: "Service Charges", value: "" },
                { label: "PM Co.", value: "", type: "checkbox" }, // Checkbox field for Property Management Company
                { label: "CBRE Managed", value: "CBRE Managed", type: "checkbox" }, // Checkbox field with "CBRE Managed"
                { label: "Management Contract Length (Month)", value: "" },
                { label: "Management Start Date", value: "" },
                { label: "Management Expiry Date", value: "" }
            ]
        },
        {
            title: "Elevators",
            fields: [
                { label: "# of Passenger Lift", value: "" },
                { label: "Car Park Lift to G/F", value: "" },
                { label: "Service Lift", value: "" },
                { label: "Cargo Lift", value: "" },
                { label: "Lift Zones #", value: "VIP Lift" },
                { label: "Service Lift Dimension", value: "" },
                { label: "Cargo Lift Dimension", value: "" },
                { label: "Lift Details", value: "- Passenger Lift:\n- Cargo Lift:" }
            ]
        },
        {
            title: "Specifications",
            fields: [
                { label: "Floor To Ceiling Height", value: "" },
                { label: "Ceiling Grid/Floor Loading Details", value: "" },
                { label: "Floor Loading", value: "" },
                { label: "Floor System", value: "" },
                { label: "Power System", value: "Power" },
                { label: "Phase", value: "" },
                { label: "Power System Details", value: "" },
                { label: "Sprinklers", value: "", type: "checkbox" }, // Checkbox for Sprinklers
                { label: "Emergency Generator", value: "No" },
                { label: "Landlord Provision Remark", value: "" }
            ]
        },
        {
            title: "Ancillary Facilities",
            fields: [
                { label: "Trading Floor", value: "No" },
                { label: "IT & Telecommunication System", value: "" },
                { label: "Security System", value: "" },
                { label: "Fire Safety System", value: "" },
                { label: "Common Facilities on Typical Floor", value: "" },
                { label: "Facility Public Remarks", value: "" },
                { label: "Facility Private Remarks", value: "" }
            ]
        },
        {
            title: "Airconditioning",
            fields: [
                { label: "A/C System", value: "Water 24Hrs for A/C" },
                { label: "Standard A/C Charges", value: "A/C Ad-hoc Charges" },
                { label: "Water 24Hrs for A/C", value: "No" },
                { label: "Chilled Water Tap-Off", value: "" },
                { label: "Condensing Water Tap-Off", value: "" },
                { label: "Public Remarks", value: "" },
                { label: "Private Remarks", value: "" }
            ]
        },
        {
            title: "Industrial Information",
            fields: [
                { label: "Type of Use", value: "" },
                { label: "Type of Loading Bays", value: "" },
                { label: "Total Loading Bays", value: "" },
                { label: "Loading Bay Details", value: "" },
                { label: "Other General Details", value: "" },
                { label: "Cranes (Y/N)", value: "", type: "checkbox" }, // Checkbox for cranes
                { label: "Accessible For", value: "" }
            ]
        }
    ]
};


export { ACCOUNTCOLUMN, CONTACTCOLUMN, PROPERTYCATEGORIES, PROPERTYDETAILS };