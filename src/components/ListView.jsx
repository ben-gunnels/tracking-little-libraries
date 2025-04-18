import styles from './ListView.module.css';
import prisma from '../../lib/prisma';

export default async function ListView({ libraries }) {
    // const libraries = [{ "latitude": -90, "longitude": 90 }, { "latitude": 45, "longitude": 55 }]
    return (
        <div className="bg-white text-black rounded-md h-96 p-4 shadow-md max-h-96 overflow-y-auto w-[250px]">
            <h2 className="text-lg font-semibold mb-3">Locations</h2>
            <ul className="space-y-2">
                {libraries.map(lib => (
                    <li className="border-b pb-2" key={lib.id}>
                        ({lib.latitude}, {lib.longitude})
                    </li>
                ))}
            </ul>
        </div>
    )

}