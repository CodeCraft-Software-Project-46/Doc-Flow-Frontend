export const Dashboard = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-900">Total Documents</h3>
                <p className="text-3xl font-bold text-blue-600 mt-2">124</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-green-900">Active Workflows</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">8</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-amber-900">Pending Tasks</h3>
                <p className="text-3xl font-bold text-amber-600 mt-2">15</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-purple-900">Team Members</h3>
                <p className="text-3xl font-bold text-purple-600 mt-2">12</p>
            </div>
        </div>
    </div>
);