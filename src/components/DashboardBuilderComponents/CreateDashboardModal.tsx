import React, { useState } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const rolesList = [
    "Staff / Initiator",
    "Approver",
    "Supervisor / Manager",
    "Admin",
    "External Party",
];

export const CreateDashboardModal: React.FC<Props> = ({
                                                          isOpen,
                                                          onClose,
                                                      }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    if (!isOpen) return null;

    const toggleRole = (role: string) => {
        if (selectedRoles.includes(role)) {
            setSelectedRoles(selectedRoles.filter((r) => r !== role));
        } else {
            setSelectedRoles([...selectedRoles, role]);
        }
    };

    const handleSubmit = () => {
        console.log({
            name,
            description,
            roles: selectedRoles,
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[600px] rounded-xl shadow-lg p-6 space-y-6">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-semibold">
                            Create New Dashboard
                        </h2>
                        <p className="text-gray-500 text-sm">
                            Define a new dashboard template and assign it to roles.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Dashboard Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Dashboard Name
                    </label>
                    <input
                        type="text"
                        placeholder="e.g., Finance Team Dashboard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        placeholder="Describe the dashboard purpose..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Roles */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Assign to Roles
                    </label>

                    <div className="flex flex-wrap gap-4">
                        {rolesList.map((role) => (
                            <label
                                key={role}
                                className="flex items-center gap-2 text-sm"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedRoles.includes(role)}
                                    onChange={() => toggleRole(role)}
                                    className="accent-blue-600"
                                />
                                {role}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 pt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Create & Open Builder
                    </button>
                </div>
            </div>
        </div>
    );
};