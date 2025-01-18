# Domain Data Insights

**Domain Data Insights** is a React-based web application that provides detailed insights into domain data. The app allows users to log in, view, search, and sort domain data fetched from a CSV file. This app is built with a clean and modern design, ensuring ease of use and an optimized user experience. It also includes protected routes, with user authentication via a simple login page.

## Features

- **User Authentication**: Secure login mechanism with a hardcoded username and password (`admin/admin`).
- **CSV Data Import**: Data is fetched from a CSV file and displayed in a responsive data table.
- **Search Functionality**: Search through domain data across multiple fields (e.g., domain name, traffic, etc.).
- **Sorting**: Sort domain data based on various fields such as domain name or traffic.
- **Pagination**: The table supports pagination for easy navigation through large datasets.
- **Responsive Design**: The app is fully responsive, optimized for use on both desktop and mobile devices.
- **Protected Routes**: Only logged-in users can access the domain list page.

## Tech Stack

- **Frontend**: React.js
- **Backend (Optional)**: Can be extended with Express.js for API or Redis for in-memory data storage.
- **State Management**: React hooks for managing application state.
- **Routing**: React Router for navigation between login and domain list views.
- **CSV Parsing**: PapaParse for parsing CSV data.
- **Styling**: Tailwind CSS for modern and responsive UI.
- **Icons**: React Icons for buttons and icons.

## Installation

To run the app locally, follow these steps:

### Prerequisites

- **Node.js**: Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).
- **Git**: Ensure you have Git installed. You can download it from [here](https://git-scm.com/).

### Steps to Install and Run

1. Clone this repository:
    ```bash
    git clone <your-repository-url>
    ```

2. Navigate to the project directory:
    ```bash
    cd <project-directory>
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

4. Run the application:
    ```bash
    npm start
    ```

    The app should now be running at `http://localhost:5173`.

## Usage

1. **Login**: 
   - Open the app and enter the login credentials (`username: demo`, `password: demo`).
   
2. **Domain Data Table**:
   - Once logged in, you will be directed to the domain data table page.
   - The table displays domain data fetched from a CSV file. 
   - You can **search** through the data, **sort** by columns (e.g., domain name, traffic), and use **pagination** to navigate large datasets.

3. **Logout**: 
   - To log out, simply close the app or implement additional logout functionality.

## File Details

### **App.jsx**
Contains the main routing logic. It imports the `Login` and `DomainList` components and renders them based on the route.

### **Login.jsx**
This is the login page where users can input their credentials. Upon successful login, the user is redirected to the domain list page.

### **DomainList.jsx**
Displays the domain data in a table format. It allows users to search, sort, and paginate through the domain data.

### **Domain.csv**
Contains the domain data in CSV format that is parsed and displayed in the app.

## Contributing

We welcome contributions to this project! If you'd like to help improve the app:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **React**: The primary JavaScript library for building the user interface.
- **React Router**: For handling routing and navigation.
- **PapaParse**: For parsing CSV files.
- **Tailwind CSS**: For fast, responsive, and customizable CSS styling.
- **React Icons**: For easy-to-use icons.

---

Feel free to reach out if you need any assistance! 😊


