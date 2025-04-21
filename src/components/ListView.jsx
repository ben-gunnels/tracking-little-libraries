
export default async function ListView({ libraries }) {
    // const libraries = [{ "latitude": -90, "longitude": 90 }, { "latitude": 45, "longitude": 55 }]
    return (
        <div className="bg-white text-black rounded-md h-full p-4 shadow-md overflow-y-auto w-[250px]">
            <h2 className="text-lg font-semibold mb-3">Locations</h2>
            <ul className="space-y-2">
                {libraries.map(lib => (
                    <li className="border-b pb-2" key={lib.id}>
                        {lib.name}:
                        ({lib.latitude}, {lib.longitude})
                    </li>
                ))}
            </ul>
        </div>
    )
}