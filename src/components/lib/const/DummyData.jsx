const CONTACTDATADUMMY = [
  { "id": 1, "name": "John Doe", "contactmailingaddress": "123 Main St, Anytown, USA", "accountName": "ABC Company", "businessphone": "(555) 123-4567", "mobile": "(555) 987-6543", "email": "john.doe@example.com", "status": "Active" },
  { "id": 2, "name": "Jane Smith", "contactmailingaddress": "456 Elm St, Another Town, USA", "accountName": "XYZ Corporation", "businessphone": "(555) 222-3333", "mobile": "(555) 999-8888", "email": "jane.smith@example.com", "status": "Inactive" },
  { "id": 3, "name": "Michael Johnson", "contactmailingaddress": "789 Oak St, Somecity, USA", "accountName": "123 Enterprises", "businessphone": "(555) 444-5555", "mobile": "(555) 111-2222", "email": "michael.johnson@example.com", "status": "Active" },
  { "id": 4, "name": "Emily Brown", "contactmailingaddress": "321 Pine St, Yourtown, USA", "accountName": "Brown & Sons", "businessphone": "(555) 777-8888", "mobile": "(555) 333-4444", "email": "emily.brown@example.com", "status": "Active" },
  { "id": 5, "name": "David Wilson", "contactmailingaddress": "555 Cedar St, Hometown, USA", "accountName": "Wilson Holdings", "businessphone": "(555) 666-7777", "mobile": "(555) 555-1234", "email": "david.wilson@example.com", "status": "Inactive" },
  { "id": 6, "name": "Sarah Davis", "contactmailingaddress": "999 Maple St, Cityville, USA", "accountName": "Davis Consulting", "businessphone": "(555) 888-9999", "mobile": "(555) 222-3333", "email": "sarah.davis@example.com", "status": "Active" },
  { "id": 7, "name": "Robert Martinez", "contactmailingaddress": "777 Birch St, Metropolis, USA", "accountName": "Martinez & Co", "businessphone": "(555) 123-9876", "mobile": "(555) 789-4567", "email": "robert.martinez@example.com", "status": "Inactive" },
  { "id": 8, "name": "Jennifer Taylor", "contactmailingaddress": "888 Walnut St, Suburbia, USA", "accountName": "Taylor Enterprises", "businessphone": "(555) 456-7890", "mobile": "(555) 987-6543", "email": "jennifer.taylor@example.com", "status": "Active" },
  { "id": 9, "name": "Christopher Clark", "contactmailingaddress": "444 Sycamore St, Villagetown, USA", "accountName": "Clark Group", "businessphone": "(555) 987-6543", "mobile": "(555) 234-5678", "email": "christopher.clark@example.com", "status": "Active" },
  { "id": 10, "name": "Amanda Lee", "contactmailingaddress": "222 Pineapple St, Islandcity, USA", "accountName": "Lee Industries", "businessphone": "(555) 654-3210", "mobile": "(555) 876-5432", "email": "amanda.lee@example.com", "status": "Inactive" }

]

const CONTACTCOLUMNDUMMY = [
  { "label": "Name", "accessor": "name" },
  { "label": "Contact Mailing Address", "accessor": "contactmailingaddress" },
  { "label": "Account Name", "accessor": "accountName" },
  { "label": "Bussines Phone", "accessor": "businessphone" },
  { "label": "Mobile", "accessor": "mobile" },
  { "label": "Email", "accessor": "email" },
  { "label": "Status", "accessor": "status" },
]

const ACCOUNTCOLUMNDUMMY = [
  { "label": "Account Name", "accessor": "accountName" },
  { "label": "Account Status With Site", "accessor": "accountStatusWithSite" },
  { "label": "Local Account Name", "accessor": "localAccountName" },
  { "label": "Number of Active Opportunities", "accessor": "ofActiveOpportunity" },
  { "label": "SPOC", "accessor": "spoc" },
  { "label": "Billing City", "accessor": "billingCity" },
  { "label": "Billing State/Province", "accessor": "billingStateProvince" }
]

const ACCOUNTDATADUMMY = [
  { "id": 1, "accountName": "Acme Corp", "accountStatusWithSite": "Active", "localAccountName": "Acme Local", "ofActiveOpportunity": 5, "spoc": "John Doe", "billingCity": "New York", "billingStateProvince": "NY" },
  { "id": 2, "accountName": "Global Tech", "accountStatusWithSite": "Inactive", "localAccountName": "Global Local", "ofActiveOpportunity": 2, "spoc": "Jane Smith", "billingCity": "San Francisco", "billingStateProvince": "CA" },
  { "id": 3, "accountName": "Innovative Solutions", "accountStatusWithSite": "Active", "localAccountName": "Innovative Local", "ofActiveOpportunity": 8, "spoc": "Bill Gates", "billingCity": "Seattle", "billingStateProvince": "WA" },
  { "id": 4, "accountName": "Future Enterprises", "accountStatusWithSite": "Pending", "localAccountName": "Future Local", "ofActiveOpportunity": 3, "spoc": "Elon Musk", "billingCity": "Los Angeles", "billingStateProvince": "CA" },
  { "id": 5, "accountName": "Tech Innovators", "accountStatusWithSite": "Active", "localAccountName": "Tech Local", "ofActiveOpportunity": 7, "spoc": "Mark Zuckerberg", "billingCity": "Menlo Park", "billingStateProvince": "CA" },
  { "id": 6, "accountName": "NextGen Tech", "accountStatusWithSite": "Inactive", "localAccountName": "NextGen Local", "ofActiveOpportunity": 1, "spoc": "Satya Nadella", "billingCity": "Redmond", "billingStateProvince": "WA" },
  { "id": 7, "accountName": "AI Solutions", "accountStatusWithSite": "Active", "localAccountName": "AI Local", "ofActiveOpportunity": 9, "spoc": "Sundar Pichai", "billingCity": "Mountain View", "billingStateProvince": "CA" },
  { "id": 8, "accountName": "Quantum Computing", "accountStatusWithSite": "Pending", "localAccountName": "Quantum Local", "ofActiveOpportunity": 4, "spoc": "Tim Cook", "billingCity": "Cupertino", "billingStateProvince": "CA" },
  { "id": 9, "accountName": "Cyber Security", "accountStatusWithSite": "Active", "localAccountName": "Cyber Local", "ofActiveOpportunity": 6, "spoc": "Jeff Bezos", "billingCity": "Seattle", "billingStateProvince": "WA" },
  { "id": 10, "accountName": "Green Energy", "accountStatusWithSite": "Inactive", "localAccountName": "Green Local", "ofActiveOpportunity": 0, "spoc": "Larry Page", "billingCity": "Mountain View", "billingStateProvince": "CA" },
  { "id": 11, "accountName": "Acme Corp", "accountStatusWithSite": "Active", "localAccountName": "Acme Local", "ofActiveOpportunity": 5, "spoc": "John Doe", "billingCity": "New York", "billingStateProvince": "NY" },
  { "id": 12, "accountName": "Global Tech", "accountStatusWithSite": "Inactive", "localAccountName": "Global Local", "ofActiveOpportunity": 2, "spoc": "Jane Smith", "billingCity": "San Francisco", "billingStateProvince": "CA" },
  { "id": 13, "accountName": "Innovative Solutions", "accountStatusWithSite": "Active", "localAccountName": "Innovative Local", "ofActiveOpportunity": 8, "spoc": "Bill Gates", "billingCity": "Seattle", "billingStateProvince": "WA" },
  { "id": 14, "accountName": "Future Enterprises", "accountStatusWithSite": "Pending", "localAccountName": "Future Local", "ofActiveOpportunity": 3, "spoc": "Elon Musk", "billingCity": "Los Angeles", "billingStateProvince": "CA" },
  { "id": 15, "accountName": "Tech Innovators", "accountStatusWithSite": "Active", "localAccountName": "Tech Local", "ofActiveOpportunity": 7, "spoc": "Mark Zuckerberg", "billingCity": "Menlo Park", "billingStateProvince": "CA" },
  { "id": 16, "accountName": "NextGen Tech", "accountStatusWithSite": "Inactive", "localAccountName": "NextGen Local", "ofActiveOpportunity": 1, "spoc": "Satya Nadella", "billingCity": "Redmond", "billingStateProvince": "WA" },
  { "id": 17, "accountName": "AI Solutions", "accountStatusWithSite": "Active", "localAccountName": "AI Local", "ofActiveOpportunity": 9, "spoc": "Sundar Pichai", "billingCity": "Mountain View", "billingStateProvince": "CA" },
  { "id": 18, "accountName": "Quantum Computing", "accountStatusWithSite": "Pending", "localAccountName": "Quantum Local", "ofActiveOpportunity": 4, "spoc": "Tim Cook", "billingCity": "Cupertino", "billingStateProvince": "CA" },
  { "id": 19, "accountName": "Cyber Security", "accountStatusWithSite": "Active", "localAccountName": "Cyber Local", "ofActiveOpportunity": 6, "spoc": "Jeff Bezos", "billingCity": "Seattle", "billingStateProvince": "WA" },
  { "id": 20, "accountName": "Green Energy", "accountStatusWithSite": "Inactive", "localAccountName": "Green Local", "ofActiveOpportunity": 0, "spoc": "Larry Page", "billingCity": "Mountain View", "billingStateProvince": "CA" },
  { "id": 21, "accountName": "Acme Corp", "accountStatusWithSite": "Active", "localAccountName": "Acme Local", "ofActiveOpportunity": 5, "spoc": "John Doe", "billingCity": "New York", "billingStateProvince": "NY" },
  { "id": 22, "accountName": "Global Tech", "accountStatusWithSite": "Inactive", "localAccountName": "Global Local", "ofActiveOpportunity": 2, "spoc": "Jane Smith", "billingCity": "San Francisco", "billingStateProvince": "CA" },
  { "id": 23, "accountName": "Innovative Solutions", "accountStatusWithSite": "Active", "localAccountName": "Innovative Local", "ofActiveOpportunity": 8, "spoc": "Bill Gates", "billingCity": "Seattle", "billingStateProvince": "WA" },
  { "id": 24, "accountName": "Future Enterprises", "accountStatusWithSite": "Pending", "localAccountName": "Future Local", "ofActiveOpportunity": 3, "spoc": "Elon Musk", "billingCity": "Los Angeles", "billingStateProvince": "CA" },
  { "id": 25, "accountName": "Tech Innovators", "accountStatusWithSite": "Active", "localAccountName": "Tech Local", "ofActiveOpportunity": 7, "spoc": "Mark Zuckerberg", "billingCity": "Menlo Park", "billingStateProvince": "CA" },
  { "id": 26, "accountName": "NextGen Tech", "accountStatusWithSite": "Inactive", "localAccountName": "NextGen Local", "ofActiveOpportunity": 1, "spoc": "Satya Nadella", "billingCity": "Redmond", "billingStateProvince": "WA" },
  { "id": 27, "accountName": "AI Solutions", "accountStatusWithSite": "Active", "localAccountName": "AI Local", "ofActiveOpportunity": 9, "spoc": "Sundar Pichai", "billingCity": "Mountain View", "billingStateProvince": "CA" },
  { "id": 28, "accountName": "Quantum Computing", "accountStatusWithSite": "Pending", "localAccountName": "Quantum Local", "ofActiveOpportunity": 4, "spoc": "Tim Cook", "billingCity": "Cupertino", "billingStateProvince": "CA" },
  { "id": 29, "accountName": "Cyber Security", "accountStatusWithSite": "Active", "localAccountName": "Cyber Local", "ofActiveOpportunity": 6, "spoc": "Jeff Bezos", "billingCity": "Seattle", "billingStateProvince": "WA" },
]

const manyNodes = [
  {
    id: 1,
    name: "Task 1",
    deadline: new Date(2023, 6, 22),
    type: "Feature",
    isComplete: false,
    nodes: [
      {
        id: 2,
        name: "Sub-task 1.1",
        deadline: new Date(2023, 7, 15),
        type: "Bugfix",
        isComplete: true,
        nodes: [],
      },
      {
        id: 3,
        name: "Sub-task 1.2",
        deadline: new Date(2023, 7, 20),
        type: "Documentation",
        isComplete: false,
        nodes: [],
      },
    ],
  },
  {
    id: 4,
    name: "Task 2",
    deadline: new Date(2023, 8, 10),
    type: "Improvement",
    isComplete: false,
    nodes: [],
  },
  {
    id: 5,
    name: "Task 3",
    deadline: new Date(2023, 9, 5),
    type: "Feature",
    isComplete: true,
    nodes: [
      {
        id: 6,
        name: "Sub-task 3.1",
        deadline: new Date(2023, 9, 15),
        type: "Bugfix",
        isComplete: false,
        nodes: [],
      },
    ],
  },
];


export { CONTACTDATADUMMY, ACCOUNTDATADUMMY, ACCOUNTCOLUMNDUMMY , manyNodes, CONTACTCOLUMNDUMMY};