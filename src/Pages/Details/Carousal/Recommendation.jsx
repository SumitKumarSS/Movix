import React from "react";

import {Carousal} from "../../../components/Carousal/Carousal"
import useFetch from "../../../components/Hooks/useFetch"

const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );

    return (
        <Carousal
            title="Recommendations"
            data={data?.results}
            loading={loading}
            tabs={mediaType}
        />
    );
};

export default Recommendation;