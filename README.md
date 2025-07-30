# GuestSync Lite - Hotel Management System

A modern, mobile-first hotel management application designed for hotel staff and administrators to efficiently manage guest requests, room status, maintenance tasks, and internal communication.

## 🚀 Features

### **Core Functionality**
- **Role-Based Access Control**: Separate interfaces for Admin and Housekeeper roles
- **Mobile-First Design**: Optimized for mobile devices with responsive layouts
- **Real-Time Communication**: Internal chat system for staff coordination
- **Request Management**: Complete lifecycle management of guest service requests
- **Room Management**: Real-time room status tracking and management
- **Maintenance Tracking**: Comprehensive maintenance task management (Admin only)

### **Dashboard Features**
- **Admin Dashboard**: Overview of hotel operations, statistics, and recent activities
- **Housekeeper Dashboard**: Task management, performance metrics, and assigned rooms
- **Real-Time Statistics**: Live updates on requests, room occupancy, and maintenance status

### **Request Management**
- **Multi-Category Support**: Housekeeping, Maintenance, Technology, Front Desk
- **Priority Levels**: Low, Medium, High, Urgent priority classification
- **Status Tracking**: New → In Progress → Completed workflow
- **Assignment System**: Assign requests to specific staff members
- **Search & Filtering**: Advanced filtering by status, priority, category, and search terms

### **Room Management**
- **Status Tracking**: Occupied, Vacant, Cleaning, Maintenance states
- **Guest Information**: Check-in/out dates, guest details, assigned housekeepers
- **Grid & List Views**: Flexible viewing options for different screen sizes
- **Room Operations**: Mark rooms for cleaning, maintenance, or ready status

### **Maintenance System** (Admin Only)
- **Task Creation**: Create new maintenance tasks with detailed information
- **Scheduling**: Schedule maintenance tasks with estimated duration
- **Assignment**: Assign tasks to maintenance staff
- **Progress Tracking**: Track task completion and actual vs estimated time
- **Cost Tracking**: Monitor maintenance costs and expenses

### **Internal Chat System**
- **Multiple Chat Rooms**: General Staff, Maintenance Updates, Emergency Alerts, Housekeeping Team
- **Real-Time Messaging**: Instant communication between staff members
- **Role-Based Access**: Different chat rooms for different staff groups
- **Mobile Optimized**: Collapsible interface for mobile devices
- **Unread Counts**: Track unread messages across chat rooms

### **Mobile-First Design**
- **Responsive Layout**: Optimized for all screen sizes
- **Touch-Friendly**: Proper touch targets and mobile navigation
- **Collapsible Sidebar**: Mobile-optimized navigation
- **Bottom Navigation**: Easy access to key features on mobile
- **Overflow Prevention**: No horizontal scrolling issues

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React
- **State Management**: React hooks and context
- **Notifications**: Sonner toast notifications
- **Mobile Optimization**: Custom mobile-first CSS and responsive design

## 📱 Mobile Features

### **Responsive Design**
- Mobile-first approach with progressive enhancement
- Collapsible sidebar navigation
- Bottom navigation for mobile devices
- Touch-friendly buttons and interactions
- Proper viewport handling

### **Mobile Optimizations**
- Prevented input zoom on iOS
- Minimum 44px touch targets
- Smooth scrolling behavior
- Overflow prevention
- Safe area handling

## 🏗️ Project Structure

```
guest-sync-lite/
├── app/                          # Next.js App Router pages
│   ├── chat/                     # Chat functionality
│   ├── dashboard/                # Dashboard page
│   ├── maintenance/              # Maintenance management (Admin)
│   ├── requests/                 # Request management
│   ├── rooms/                    # Room management
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # React components
│   ├── admin/                    # Admin-specific components
│   ├── chat/                     # Chat system components
│   ├── housekeeper/              # Housekeeper-specific components
│   ├── layouts/                  # Layout components
│   ├── navigation/               # Navigation components
│   ├── ui/                       # Reusable UI components
│   └── views/                    # Page view components
├── hooks/                        # Custom React hooks
├── lib/                          # Utilities and types
└── public/                       # Static assets
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm or yarn

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd guest-sync-lite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### **Build for Production**
```bash
npm run build
npm start
```

## 👥 User Roles

### **Admin Role**
- Full access to all features
- Dashboard with hotel-wide statistics
- Request management and assignment
- Room status management
- Maintenance task creation and management
- Access to all chat rooms

### **Housekeeper Role**
- Limited to assigned rooms and tasks
- Personal dashboard with performance metrics
- Request handling for assigned areas
- Room cleaning status updates
- Access to housekeeping-specific chat rooms

## 📊 Demo Data

The application includes comprehensive mock data:

- **4 Staff Members**: 2 Admins, 2 Housekeepers
- **8 Service Requests**: Various categories and priorities
- **13 Rooms**: Different statuses and guest information
- **4 Chat Rooms**: Different purposes and participants
- **4 Maintenance Tasks**: Various types and statuses

## 🎯 Key Features Demo

### **1. Role Switching**
- Use the role switcher in the top-right corner
- Switch between Admin and Housekeeper views
- Experience different dashboards and permissions

### **2. Request Management**
- View all service requests on the Requests page
- Filter by status, priority, and category
- Mark requests as in progress or completed
- Assign requests to staff members

### **3. Room Management**
- View room status on the Rooms page
- Switch between grid and list views
- Update room status (cleaning, maintenance, ready)
- Track guest information and check-in/out dates

### **4. Chat System**
- Navigate to the Chat page
- Join different chat rooms
- Send and receive messages
- Experience mobile-optimized chat interface

### **5. Maintenance Management** (Admin Only)
- Create new maintenance tasks
- Assign tasks to maintenance staff
- Track task progress and completion
- Monitor costs and time estimates

## 📱 Mobile Experience

The application is fully optimized for mobile devices:

- **Responsive Navigation**: Collapsible sidebar and bottom navigation
- **Touch-Friendly Interface**: Proper button sizes and spacing
- **Mobile Chat**: Optimized chat interface for mobile
- **Flexible Layouts**: Grid and list views adapt to screen size
- **No Overflow Issues**: Content properly contained within viewport

## 🔧 Customization

### **Adding New Features**
1. Create new page in `app/` directory
2. Add navigation item in `components/navigation/sidebar-nav.tsx`
3. Create corresponding view component in `components/views/`
4. Update types in `lib/types.ts` if needed
5. Add mock data in `lib/mock-data.ts`

### **Styling**
- Uses Tailwind CSS for styling
- Custom components in `components/ui/`
- Mobile-first responsive design
- Dark mode support available

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js
3. Deploy with default settings

### **Other Platforms**
- Build the application: `npm run build`
- Start the production server: `npm start`
- Deploy the `out` directory to your hosting platform

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions, please open an issue in the repository.

---

**GuestSync Lite** - Streamlining hotel operations with modern technology and mobile-first design.
