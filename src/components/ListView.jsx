import styles from './ListView.module.css';


export default function ListView() {
    

    return (
        <div className="bg-white text-black rounded-md p-4 shadow-md max-h-96 overflow-y-auto w-[250px]">
            <h2 className="text-lg font-semibold mb-3">Locations</h2>
            <ul className="space-y-2">
                <li className="border-b pb-2">New York</li>
                <li className="border-b pb-2">Tokyo</li>
                <li className="border-b pb-2">London</li>
                <li className="border-b pb-2">Berlin</li>
                <li className="border-b pb-2">Sydney</li>
                <li className="border-b pb-2">San Francisco</li>
                <li className="pb-2">Toronto</li>
            </ul>
        </div>
    )

}