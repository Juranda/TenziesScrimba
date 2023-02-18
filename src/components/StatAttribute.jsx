export default function StatAttribute({ name, value }) {
    return <div className="attribute">
        <h3>{name}</h3>
        <p>{value}</p>
    </div>
}