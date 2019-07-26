import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Head from "next/head";
import Link from "next/link";

import PaginationStyles from "./styles/PaginationStyles";
import { perPage } from "../config";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    trainersConnection {
      aggregate {
        count
      }
    }
  }
`;

const PaginationTrainer = ({ page }) => {
  return (
    <Query query={PAGINATION_QUERY}>
      {({ data, loading, error }) => {
        if (error) return <p>Error</p>;
        if (loading) return <p>Cargando paginación...</p>;

        const { count } = data.trainersConnection.aggregate;
        const pages = Math.ceil(count / perPage);

        return (
          <PaginationStyles>
            <Head>
              <title>
                Sports app! - Página {page} de {pages}
              </title>
            </Head>
            <Link
              prefetch
              href={{
                pathname: "trainers",
                query: { page: page - 1 }
              }}
            >
              <a className="prev" aria-disabled={page <= 1}>
                Anterior
              </a>
            </Link>
            <p>
              Página {page} de {pages}
            </p>
            <p> {count} entrenadores</p>
            <Link
              prefetch
              href={{
                pathname: "trainers",
                query: { page: page + 1 }
              }}
            >
              <a className="next" aria-disabled={page >= pages}>
                Siguiente
              </a>
            </Link>
          </PaginationStyles>
        );
      }}
    </Query>
  );
};

export default PaginationTrainer;
