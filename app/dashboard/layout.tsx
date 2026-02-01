import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-bg-primary">
                <div className="p-4 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
